import os
import json
import boto3
import time
import requests

# Connect to Queue
sqs = boto3.client('sqs')
ssm = boto3.client('ssm' )
ec2 = boto3.resource('ec2')
s3 = boto3.client('s3')

queue_name = os.environ['STOP_CRAWLER_QUEUE']
sonarqube_name = os.environ["EC2_SONAR_SERVER"]
sonar_username = os.environ["EC2_SONAR_USERNAME"]
sonar_password = os.environ["EC2_SONAR_PASS"]
bucket_name = os.environ['S3_BUCKET']

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
    
    # Send Command to ec2 instance
    github_url = f"https://www.github.com/{owner}/{repo}"
    ssm_response = ssm.send_command( 
        InstanceIds=[ sonarqube_name ], 
        DocumentName='AWS-RunShellScript', 
        Comment=f'{github_url}: clone source code and scan by sonarqube', 
        Parameters={
            "commands":[
                "sodu su -",
                "cd /home/download",
                f"git clone {github_url}",
                f"cd {repo}",
                "/opt/sonar-scanner/bin/sonar-scanner \\", 
                "-Dsonar.host.url=http://localhost:9000 \\",
                "-Dsonar.scm.provider=git \\", 
                "-Dsonar.sources=. \\", 
                f"-Dsonar.projectKey={owner}:{repo} \\", 
                f"-Dsonar.login={sonar_username} \\",
                f"-Dsonar.password={sonar_password}",
                "cd ..",
                f"rm -rf {repo}"
            ]
        }
    )
    
    
    time.sleep(3)
    
    # Get run command status
    ssm_command_id = ssm_response['Command']['CommandId']
    ssm_output = ssm.get_command_invocation(
      CommandId=ssm_command_id,
      InstanceId=sonarqube_name,
    )
    
    while (ssm_output["Status"] == "InProgress"):
        ssm_output = ssm.get_command_invocation(
          CommandId=ssm_command_id,
          InstanceId=sonarqube_name,
        )
        
        print(ssm_output["Status"])
        
        time.sleep(3)

    # Get sonarqube info from API
    metrics = [
        'ncloc','complexity',
        'violations',
        'comment_lines',
        'files','security_rating', 
        'reliability_rating',
        'sqale_rating', # maintainability rating,
        'comment_lines_density',
        'files',
        'functions'
    ]

    # Waiting sonar server to be ready after calculation
    time.sleep(15)
    
    # Get all metrics from SonarQube server
    instances = ec2.Instance(sonarqube_name)
    ec2_ip_address = instances.public_ip_address
    sonar_info = requests.get(f'http://{ec2_ip_address}:9000/api/measures/component', 
        auth=(sonar_username, sonar_password), 
        params={
            'component': f"{owner}:{repo}",
            'metricKeys': ','.join(metrics)
    })
    
    # Create json file to tmp folder
    file_name = 'sonar-info.json'
    file_path = os.path.join('/tmp', repo, file_name)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w') as f:
        json.dump(sonar_info.json(), f)

    # Upload S3 bucket
    destination_url = f"{owner}/{repo}/{file_name}"
    s3.upload_file(file_path, bucket_name, destination_url)

    # Add queue to inform completion
    sqs.send_message(
        QueueUrl=queue_name,
        MessageBody='source_code_status',
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