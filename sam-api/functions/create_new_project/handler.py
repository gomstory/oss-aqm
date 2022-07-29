import json
import boto3
import os
import datetime
import re

# connect with SQS
print('connecting with SQS service')
queue_name = os.environ['SQSQueueName']
sqs = boto3.client('sqs')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def get_owner_and_project(github_url):
    result = re.search(r"^https:\/\/github.com\/([a-z0-9A-Z]+)\/(([\w\d]+))", github_url)
    group = result.groups()
    owner = group[0]
    projec = group[1]
    return (owner, projec)

def lambda_handler(event, context):
    # Get github url from body
    body = json.loads(event['body'])
    github_url = body['github_url']
    requested_time = datetime.datetime.now()
    
    # Attract full_url, project, owner from the link
    owner_name, project_name = get_owner_and_project(github_url)
    
    # Create queue with body and additional attributes
    print('start sending queue', github_url, owner_name, project_name)
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody=github_url,
        MessageDeduplicationId='github',
        MessageGroupId='github',
        MessageAttributes={
            'owner_name': {
                'StringValue': owner_name,
                'DataType': 'String'
            },
            'project_name': {
                'StringValue': project_name,
                'DataType': 'String'
            },
            'requested_time': {
                'StringValue': str(requested_time),
                'DataType': 'String'
            }
        }
    )

    return respond(None, response)