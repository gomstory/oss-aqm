from datetime import datetime
import json
import os
import boto3
import datetime

# Connect to dynamoDb, Lambda
region_name = os.environ['REGION_NAME']
table_name = os.environ['CRAWLER_TABLE']
crawler_table = boto3.resource('dynamodb').Table(table_name)
lamb = boto3.client('lambda')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def lambda_handler(event, context):
    # Get data from queue
    print('event', event)
    records = event['Records']
    raw_data = records[0]
    github_url = raw_data['body']
    repo = raw_data['messageAttributes']['repo']['stringValue']
    owner = raw_data['messageAttributes']['owner']['stringValue']

    # Check if github_id already exists ignore and remove q
    row = crawler_table.get_item(Key={'github_id': github_url})

    if 'Item' not in row:
        # Create a new project record
        today = datetime.datetime.now()
        new_row = crawler_table.put_item(
            Item={
                'github_id': github_url,
                'repo': repo,
                'owner': owner,
                'requested_date': str(today),
                'is_license_ready': False,
                'is_lang_ready': False,
                'is_repo_info_ready': False
            }
        )

    # Call crawler lambdars
    functions_list = [
        os.environ['GET_REPO_INFO_FUNCTION'],
        os.environ['GET_LICENSE_FUNCTION'],
        os.environ['GET_LANG_FUNCTION']
    ]

    payload = {
        "github_id": github_url,
        "repo": repo,
        "owner": owner
    }

    for func_name in functions_list:
        print('Invoke func', func_name)
        lamb.invoke(
            FunctionName=func_name,
            Payload=json.dumps(payload),
        )

    # Return success or fail
    return respond(None, 'OK')
