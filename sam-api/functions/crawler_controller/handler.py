import json
import os
import boto3

# Connect to dynamoDb
region_name = os.environ['REGION_NAME']
dynamo = boto3.client('dynamodb', region_name=region_name)
table_name = os.environ['CRAWLER_TABLE']

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
    records = event['Records']
    q_data = records[0]
    github_url = q_data['body']
    project_name = q_data['messageAttributes']['project_name']['stringValue']
    owner_name = q_data['messageAttributes']['owner_name']['stringValue']
    print(q_data)

    # Create project record
    # TODO: Check if github_id already exists ignore and remove q
    response = dynamo.put_item(
        TableName=table_name,
        Item={
            'github_id': {
                'S': github_url
            },
            'project_name': {
                'S': project_name
            },
            'owner_name': {
                'S': owner_name
            },
            'created_date': {
                'S': '1245'
            },
            'is_source_code_ready': {
                'BOOL': False
            },
            'is_license_ready': {
                'BOOL': False
            },
            'is_release_ready': {
                'BOOL': False
            },
            'is_lang_ready': {
                'BOOL': False
            },
            'is_issue_ready': {
                'BOOL': False
            }
        }
    )

    # Call crawler lambdars

    # Return success or fail
    return respond(None, response)