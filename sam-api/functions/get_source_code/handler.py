import os
import json
import boto3
import time

# Connect to Queue
queue_name = os.environ['STOP_CRAWLER_QUEUE']
sqs = boto3.client('sqs')
ssm = boto3.client('ssm' )
sonarqube_name = os.environ["EC2_SONAR_SERVER"]

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
    instance_id = sonarqube_name
    ssm_response = ssm.send_command( 
        InstanceIds=[ instance_id ], 
        DocumentName='AWS-RunShellScript', 
        Comment='Send Github repo to clone source code and scan by sonarqube', 
        Parameters={
            "commands":[
                "sodu su -",
                "cd /home/download",
                f"git clone {github_url}",
                "/opt/sonar-scanner/bin/sonar-scanner \\", 
                f"-Dsonar.projectKey={owner}:{repo} \\", 
                f"-Dsonar.sources={repo} \\", 
                "-Dsonar.host.url=http://localhost:9000 \\", 
                "-Dsonar.login=***REMOVED*** \\",
                "-Dsonar.password=sonar***REMOVED***",
                f"rm -rf {repo}"
            ]
        }
    )
    
    time.sleep(3)
    
    # Get run command status
    ssm_command_id = ssm_response['Command']['CommandId']
    ssm_output = ssm.get_command_invocation(
      CommandId=ssm_command_id,
      InstanceId=instance_id,
    )
    
    while (ssm_output["Status"] == "InProgress"):
        ssm_output = ssm.get_command_invocation(
          CommandId=ssm_command_id,
          InstanceId=instance_id,
        )
        
        print(ssm_output["Status"])
        
        time.sleep(3)

    # Add queue to inform completion
    destination_url = github_url + 'source_code'
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