import os
import json
import boto3

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

# The lambda function requires git layer, checkout template.yml
def lambda_handler(event, context):
    # Get repo and owner from event prop
    repo = event['repo']
    owner = event['owner']
    
    # Clone source code to tmp folder
    tmp_folder = f"/tmp"
    destination_url = f"{owner}/{repo}/code"
    github_url = f"https://github.com/{owner}/{repo}.git"
    os.system(f"git clone {github_url} {tmp_folder}")

    # Add queue to inform completion
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='source_code_status',
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
            },
            'status': {
                'StringValue': 'completed',
                'DataType': 'String'
            }
        }
    )

    return respond(None, "OK")