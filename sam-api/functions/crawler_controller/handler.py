from datetime import datetime
import json
import os
import boto3
import datetime

# Connect to dynamoDb, Lambda
region_name = os.environ['REGION_NAME']
table_name = os.environ['CRAWLER_TABLE']
token_table_name = os.environ["TOKEN_TABLE"]
crawler_table = boto3.resource('dynamodb').Table(table_name)
token_table = boto3.resource('dynamodb').Table(token_table_name)
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
    requestor = raw_data['messageAttributes']['requestor']['stringValue']

    # Check if github_id already exists ignore and remove q
    row = crawler_table.get_item(Key={'github_id': github_url})
    row_token = token_table.scan(Limit=3)
    access_token = list(map(lambda x: x["access_token"], row_token["Items"]))

    if 'Item' not in row:
        # Create a new project record
        today = datetime.datetime.now()
        crawler_table.put_item(
            Item={
                'github_id': github_url,
                'repo': repo,
                'owner': owner,
                'requestor': requestor,
                'requested_date': str(today),
                'license_status': "in-progress",
                'lang_status': "in-progress",
                'repo_info_status': "in-progress",
                'release_status': "in-progress",
                'source_code_status': "in-progress",
                'contributor_status': "in-progress",
                'issue_status': "in-progress",
                'core_team_status': 'in-progress',
                'user_status': 'in-progress'
            }
        )

        # Call crawler lambdars
        functions_list = [
            os.environ["GET_SOURCE_CODE_FUNCTION"],
            os.environ['GET_REPO_INFO_FUNCTION'],
            os.environ['GET_LICENSE_FUNCTION'],
            os.environ['GET_LANG_FUNCTION'],
            os.environ["GET_CONTRIBUTOR_FUNCTION"],
            os.environ["GET_RELEASE_FUNCTION"],
            os.environ["GET_ISSUE_FUNCTION"],
            os.environ["GET_CORE_TEAM_FUNCTION"],
            os.environ["GET_USER_FUNCTION"]
        ]

        payload = {
            "github_id": github_url,
            "repo": repo,
            "owner": owner,
            "access_token": access_token
        }

        for func_name in functions_list:
            lamb.invoke(
                FunctionName=func_name,
                InvocationType='Event',
                Payload=json.dumps(payload)
            )
            
            print('Invoke func', func_name)
            
    # Return success or fail
    return respond(None, 'OK')
