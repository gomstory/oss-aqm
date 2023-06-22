import json
import boto3
import os
import subprocess

# Connect to AWS
bucket_name = os.environ['S3_BUCKET']
queue_name = os.environ['STOP_CRAWLER_QUEUE']
s3 = boto3.client('s3')
sqs = boto3.client('sqs')

def respond(err, res=None):
	return {
		'statusCode': '400' if err else '200',
		'body': str(err) if err else json.dumps(res),
		'headers': {
			'Content-Type': 'application/json'
		}
	}

def lambda_handler(event, context):
	# Show info for debuging purpose
	print(event)
	rows = {}
	repo = event['repo']
	owner = event['owner']
	temp_url = "/tmp"
	git_url = f"https://github.com/{owner}/{repo}"
	
	# Clone projec
	subprocess.run(["git", "clone", git_url,], cwd=temp_url)
	total_markdown = os.popen(f"ls -R {temp_url}/{repo} | grep .md | wc -l ").read().strip()
	rows['markdown'] = int(total_markdown)
	
	# Create json file to tmp folder
	file_name = 'files.json'
	file_path = os.path.join('/tmp', repo, file_name)
	os.makedirs(os.path.dirname(file_path), exist_ok=True)
	with open(file_path, 'w') as f:
		json.dump(rows, f)

	# Upload S3 bucket
	destination_url = f"{owner}/{repo}/{file_name}"
	s3.upload_file(file_path, bucket_name, destination_url)

	# Clear folder before leave
	subprocess.run(["rm", "-rf", repo], cwd=temp_url)

	# Add queue to inform completion
	sqs.send_message(
		QueueUrl=queue_name,
		MessageBody='file_status',
		MessageDeduplicationId=destination_url,
		MessageGroupId=repo,
		MessageAttributes={
			'function_name': {
				'StringValue': 'get_file',
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