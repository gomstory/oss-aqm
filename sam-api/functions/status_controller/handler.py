import json
import os
import boto3

# Connect to dynamoDb
region_name = os.environ['REGION_NAME']
dynamo = boto3.client('dynamodb', region_name=region_name)
crawler_table_name = os.environ['CRAWLER_TABLE']
crawler_table = boto3.resource('dynamodb', region_name=region_name).Table(crawler_table_name)
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
    record = event['Records'][0]
    queue_key = record['body']
    attributes = record['messageAttributes']
    owner = attributes['owner']['stringValue']
    repo = attributes['repo']['stringValue']
    status = attributes['status']['stringValue']
    
    # Update status of specific row
    github_id = f'https://github.com/{owner}/{repo}'
    crawler_table.update_item(
        Key={'github_id': github_id},
        UpdateExpression=f'SET {queue_key} = :val',
        ExpressionAttributeValues={
            ':val': status
        }
    )

    # Check all crawler has been completed or not
    status_checklist = [
        'license_status', 
        'lang_status', 
        'repo_info_status', 
        'source_code_status',
        'contributor_status',
        'release_status',
        'issue_status',
        'core_team_status',
        'user_status',
        'forum_status',
        'book_status',
        'course_status'
    ]
    
    response = crawler_table.get_item(Key={'github_id': f'https://github.com/{owner}/{repo}'})
    item = response['Item']
    is_all_ready = True

    for key in status_checklist:
        if key in item:
            if item[key] != "completed":
                is_all_ready = False
                break

    # Invoke Analyser Function to callculate score once all crawlers have finished
    if is_all_ready is True:
        func_name = os.environ['ANALYSER_FUNCTION']
        
        lamb.invoke(
            FunctionName=func_name,
            Payload=json.dumps({
                "github_id": github_id,
                "repo": repo,
                "owner": owner,
                "item": item
        }))
        
        print('Analyses::Invoke', func_name)

        # Remove the record from Crawler Table
        crawler_table.delete_item(Key={ 'github_id': github_id })

    # Return success or fail
    return respond(None, 'OK')
