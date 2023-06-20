import json
import os
import boto3
from boto3 import resource

# Connect to dynamoDb, Lambda
region_name = os.environ['REGION_NAME']
table_name = os.environ['CRAWLER_TABLE']
token_table_name = os.environ["TOKEN_TABLE"]
crawler_table = boto3.resource('dynamodb').Table(table_name) # type: ignore
token_table = boto3.resource('dynamodb').Table(token_table_name) # type: ignore
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

    # Check record already created, else ingnore it.
    row = crawler_table.get_item(Key={'github_id': github_url})
    row_token = token_table.scan(Limit=5)
    access_token = list(map(lambda x: x["access_token"], row_token["Items"]))

    if 'Item' in row:
        # Update task status to in-progress
        crawler_table.update_item(
            Key={
                'github_id': github_url
            },
            UpdateExpression=f"SET #1=:1, #2=:2, #3=:3, #4=:4, #5=:5, #6=:6, #7=:7, #8=:8, #9=:9, #10=:10, #11=:11, #12=:12",
            ExpressionAttributeNames={
                '#1': "license_status",
                '#2': "lang_status",
                '#3': "repo_info_status",
                '#4': "release_status",
                '#5': "source_code_status",
                '#6': "contributor_status",
                '#7': "issue_status",
                '#8': "core_team_status",
                '#9': "user_status",
                '#10': "forum_status",
                '#11': "book_status",
                '#12': "course_status",
            },
            ExpressionAttributeValues={
                ':1': "in-progress",
                ':2': "in-progress",
                ':3': "in-progress",
                ':4': "in-progress",
                ':5': "in-progress",
                ':6': "in-progress",
                ':7': "in-progress",
                ':8': "in-progress",
                ':9': "in-progress",
                ':10': "in-progress",
                ':11': "in-progress",
                ':12': "in-progress",
            },
            ReturnValues="UPDATED_NEW"
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
            os.environ["GET_USER_FUNCTION"],
            os.environ["GET_FORUM_FUNCTION"],
            os.environ["GET_BOOK_FUNCTION"],
            os.environ["GET_COURSE_FUNCTION"]
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
            
    return respond(None, 'OK')
