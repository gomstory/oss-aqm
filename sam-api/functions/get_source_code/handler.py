import os
import json
import boto3

# Connect to S3
bucket_name = os.environ['BUCKET_NAME']
s3 = boto3.client('s3')

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def lambda_handler(event, context):
    # Get repo and owner from event prop
    repo = event['project']
    owner = event['owner']
    
    # Clone source code to tmp folder
    github_url = f"https://github.com/{owner}/{repo}.git"
    tmp_folder = f"/tmp/{repo}"
    folder_name = f"{owner}/{repo}"
    # os.system('cmd /k \"gomstory\"')
    # os.system('cmd /k \"***REMOVED***\"')
    # subprocess.call('cd /tmp', shell=True)
    print('Cloning source code')
    os.chdir('/tmp')
    if not os.path.exists(os.path.join('mydir')):
        os.makedirs('mydir')
        os.system(f"git clone ${github_url}")
    # subprocess.check_call(["git", "clone", github_url])

    # # Upload code to s3 bucket
    print('Uoload to S3')
    for root, dirs, files in os.walk(tmp_folder):
        for file in files:
            s3.upload_file(os.path.join(root, file), bucket_name, folder_name + file)

    # # TODO: Create queue to inform completion

    return respond(None, {
        'github_url': 'github_url'
    })