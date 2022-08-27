import json
import boto3
import os
import datetime
import re
import requests

# connect with SQS
queue_name = os.environ['START_CRAWLER_QUEUE']
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
    result = re.search(r"^https:\/\/github.com\/([\w\d\_\-]+)\/(([\w\d\-\_]+))", github_url)
    group = result.groups()
    owner = group[0]
    projec = group[1]
    return (owner, projec)

def lambda_handler(event, context):
    # Get github url from body
    body = json.loads(event['body'])
    github_url = body['github_url']
    requested_time = datetime.datetime.now()

    # Check repo is valid before proceed further
    res_check = requests.get(github_url)
    if res_check.status_code != 200:
        return respond(ValueError("The repository is not exists"))
    
    # Attract full_url, project, owner from the link
    owner, repo = get_owner_and_project(github_url)
    
    # Create queue with body and additional attributes
    print('start sending queue', github_url, owner, repo)
    response = sqs.send_message(
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
                'StringValue': str(requested_time),
                'DataType': 'String'
            }
        }
    )

    # Response to user
    return respond(None, {
        "github_url": github_url,
        "owner":  owner,
        "repo": repo,
        'requested_time': str(requested_time)
    })