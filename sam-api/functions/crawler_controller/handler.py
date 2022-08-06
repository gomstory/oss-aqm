from datetime import datetime
import json
import os
import boto3
import datetime

# Connect to dynamoDb
region_name = os.environ['REGION_NAME']
dynamo = boto3.client('dynamodb', region_name=region_name)
table_name = os.environ['CRAWLER_TABLE']

# Connect to Lambda
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

    # Create project record
    # TODO: Check if github_id already exists ignore and remove q
    today = datetime.datetime.now()
    response = dynamo.put_item(
        TableName=table_name,
        Item={
            'github_id': {
                'S': github_url
            },
            'repo': {
                'S': repo
            },
            'owner': {
                'S': owner
            },
            'created_date': {
                'S': str(today)
            },
            'is_license_ready': {
                'BOOL': False
            },
            'is_lang_ready': {
                'BOOL': False
            },
            'is_repo_info_ready': {
                'BOOL': False
            }
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
