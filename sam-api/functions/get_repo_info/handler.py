import json
import requests
import boto3
import os

# Connect to S3
bucket_name = os.environ['S3_BUCKET']
s3 = boto3.client('s3')

# Connect to Queue
queue_name = os.environ['STOP_CRAWLER_QUEUE']
sqs = boto3.client('sqs')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def lambda_handler(event, context):
    # Get owner and repo from event
    repo = event['repo']
    owner = event['owner']

    # Get Primary Languages
    # TODO: Add access token when calling the Github api
    response = requests.get(f'https://api.github.com/repos/{owner}/{repo}')
    data = response.json()

    # Create json file to tmp folder
    file_path = os.path.join('/tmp', repo, 'repo-info.json')
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(data, f)

    # Upload S3 bucket
    destination_url = f"{owner}/{repo}/repo-info.json"
    s3.upload_file(file_path, bucket_name, destination_url)

    # Add queue to inform completion
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='is_repo_info_ready',
        MessageDeduplicationId=destination_url,
        MessageGroupId=repo,
        MessageAttributes={
            'function_name': {
                'StringValue': 'get_repo_info',
                'DataType': 'String'
            },
            'owner': {
                'StringValue': owner,
                'DataType': 'String'
            },
            'repo': {
                'StringValue': repo,
                'DataType': 'String'
            }
        }
    )

    return respond(None, 'OK')
