import json
import os
import boto3

# Connect to dynamoDb
region_name = os.environ['REGION_NAME']
dynamo = boto3.client('dynamodb', region_name=region_name)
table_name = os.environ['CRAWLER_TABLE']
crawler_table = boto3.resource('dynamodb', region_name=region_name).Table(table_name)

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
    record = event['Records'][0]
    queue_key = record['body']
    attributes = record['messageAttributes']
    owner = attributes['owner']['stringValue']
    repo = attributes['repo']['stringValue']

    # Mark as success of every queue
    response = crawler_table.get_item(Key={'github_id': f'https://github.com/{owner}/{repo}'})
    
    if 'Item' not in response:
        raise Exception('No the record found')
    
    # Update status of specific row
    item = response['Item']
    item[queue_key] = True
    crawler_table.put_item(Item=item)

    # Check all crawler has been completed or not
    key_checklist = ['is_license_ready', 'is_lang_ready', 'is_repo_info_ready']
    is_all_ready = True

    for key in key_checklist:
        if item[key] is False:
            is_all_ready = False
            break

    # TODO: Invoke Analyser Function to callculate score once crawler has done
    if is_all_ready:
        pass

    # Return success or fail
    return respond(None, 'OK')
