import json
import boto3
import os
import googleapiclient.discovery
import googleapiclient.errors


# Connect to S3
bucket_name = os.environ['S3_BUCKET']
s3 = boto3.client('s3')

# Connect to Queue
queue_name = os.environ['STOP_CRAWLER_QUEUE']
sqs = boto3.client('sqs')

# Yuotube param
developerKey = os.environ["YoutubeAPIKey"]
api_service_name = "youtube"
api_version = "v3"

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def lambda_handler(event, context):
    # Show info for debuging purpose
    print(event)
    
    # Get owner and repo from event
    repo = event['repo']
    owner = event['owner']

    # Get Primary Languages
    youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=developerKey)
    request = youtube.search().list(
        part="snippet",
        order="date",
        q=repo,
        type="video",
        maxResults=50
    )

    response = request.execute()
    data = response

    # Create json file to tmp folder
    file_name = 'course.json'
    file_path = os.path.join('/tmp', repo, file_name)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(data, f)

    # Upload S3 bucket
    destination_url = f"{owner}/{repo}/{file_name}"
    s3.upload_file(file_path, bucket_name, destination_url)

    # Add queue to inform completion
    response = sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='course_status',
        MessageDeduplicationId=destination_url,
        MessageGroupId=repo,
        MessageAttributes={
            'function_name': {
                'StringValue': 'get_course',
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
            'upload_url': {
                'StringValue': destination_url,
                'DataType': 'String'
            },
            'status': {
                'StringValue': 'completed',
                'DataType': 'String'
            }
        }
    )

    return respond(None, 'OK')
