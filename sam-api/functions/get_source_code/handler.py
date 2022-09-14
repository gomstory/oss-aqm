import os
import json
import boto3
import time
import requests
from datetime import datetime
from dateutil import parser, relativedelta

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
        'body': str(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def get_days(created_date: str):
    now = datetime.now()
    temp = parser.parse(created_date)
    then = datetime(temp.year, temp.month, temp.day)
    diff = now - then
    days = diff.days
    return days

def shoud_analysis_project(owner: str, repo: str):
    # Get all metrics from SonarQube server
    sonarqube_name = os.environ["EC2_SONAR_SERVER"]
    instances = ec2.Instance(sonarqube_name)

    if instances.state["Name"] != "running":
        raise ValueError("Please turn on the sonarqube server")

    ec2_ip_address = instances.public_ip_address
    response = requests.get(f'http://{ec2_ip_address}:9000/api/projects/search', 
        auth=(sonar_username, sonar_password), 
        params={
            'projects': f"{owner}:{repo}",
    })

    if response.status_code != 200:
        raise ValueError("Sonarqube API is failed")

    data = response.json()
    project_list = data["components"]

    # No project found, shoud analysis the new project
    if len(project_list) == 0:
        return True

    # Project found, did it pass 7 days already
    last_analysis_days =  get_days(project_list[0]["lastAnalysisDate"])
    if last_analysis_days >= 7:
        return True
    else:
        return False

# The lambda function requires git layer, checkout template.yml
def lambda_handler(event, context):
    repo = event['repo']
    owner = event['owner']
    lambda_status = "pending"
    shoud_analysis = shoud_analysis_project(owner=owner, repo=repo)

    if shoud_analysis is True:
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
                    f"git clone {github_url}.git",
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
        
        # Waiting command to be finished
        while (ssm_output["Status"] == "InProgress"):
            ssm_output = ssm.get_command_invocation(
            CommandId=ssm_command_id,
            InstanceId=sonarqube_name,
            )
            
            print(ssm_output["Status"])
            time.sleep(2)

        # Map last status and sent to queue
        print('SSM Status:', ssm_output["Status"])
        status_switcher = {
            "Pending": "pending",
            "Delayed": "delayed",
            "Success": "completed",
            "Cancelled": "cancelled",
            "TimedOut": "timed-out",
            "Failed": "failed"
        }

        lambda_status = status_switcher.get(
            ssm_output["Status"], 'failed')
    else:
        lambda_status = "completed"

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
                'StringValue': lambda_status,
                'DataType': 'String'
            }
        }
    )

    return respond(None, "OK")