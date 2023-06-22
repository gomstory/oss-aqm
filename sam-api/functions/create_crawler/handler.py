import json
import boto3
import os
import datetime
import re
import requests

# connect with SQS
queue_name = os.environ['START_CRAWLER_QUEUE']
table_name = os.environ['CRAWLER_TABLE']
token_table_name = os.environ["TOKEN_TABLE"]
crawler_table = boto3.resource('dynamodb').Table(table_name) # type: ignore
sqs = boto3.client('sqs')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': json.dumps({"error": str(err)}) if err else json.dumps(res),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }

def get_owner_and_project(github_url):
    result = re.search(r"^https:\/\/github.com\/([\w\d\_\-]+)\/(([\w\d\-\_\.]+))", github_url)
    
    if result is None: 
        return (None, None)
    
    group = result.groups()
    owner = group[0]
    projec = group[1]
    return (owner, projec)

def lambda_handler(event, context):
    # Get github url from HTTP Request body
    body = json.loads(event['body'])
    github_url = body['github_url']
    username = body["username"] if "username" in body else ""
    created_at = datetime.datetime.now()

    # Check repo is valid before proceed further
    res_check = requests.get(github_url)
    if res_check.status_code != 200:
        return respond(ValueError("The repository is not exists"))
    
    # Attract full_url, project, owner from the link
    owner, repo = get_owner_and_project(github_url)
    if owner is None or repo is None:
        return respond(ValueError("The repository is not exists"))
    
    github_url = f'https://github.com/{owner}/{repo}'

    # Create crawler project record.
    today = datetime.datetime.now()
    crawler_table.put_item(
        Item={
            'github_id': github_url,
            'repo': repo,
            'owner': owner,
            'requestor': username,
            'created_at': str(today),
            'license_status': "in-queue",
            'lang_status': "in-queue",
            'repo_info_status': "in-queue",
            'release_status': "in-queue",
            'source_code_status': "in-queue",
            'contributor_status': "in-queue",
            'issue_status': "in-queue",
            'core_team_status': 'in-queue',
            'user_status': 'in-queue',
            'forum_status': 'in-queue',
            'book_status': "in-queue",
            'course_status': "in-queue",
            'file_status': "in-queue"
        }
    )
    
    # Create queue with body and additional attributes
    print('start sending queue', github_url, owner, repo)
    sqs.send_message(
        QueueUrl=queue_name,
        MessageBody=github_url,
        MessageDeduplicationId=github_url,
        MessageGroupId='github',
        MessageAttributes={
            'owner': {
                'StringValue': owner,
                'DataType': 'String'
            },
            'repo': {
                'StringValue': repo,
                'DataType': 'String'
            },
            'requested_time': {
                'StringValue': str(created_at),
                'DataType': 'String'
            },
            'requestor': {
                'StringValue': username,
                'DataType': 'String'
            }
        }
    )

    # Response to user
    return respond(None, {
        "github_url": github_url,
        "owner":  owner,
        "repo": repo,
        "creator": username,
        'created_at': str(created_at)
    })