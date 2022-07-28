import json
import requests
import boto3
import os

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

def lambda_handler(event, context):
    print('start sending queue')
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='send q to new project q',
        DelaySeconds=500
    )

    return respond(None, response)