from datetime import datetime
import json
import boto3
import os
import re
import requests
from decimal import Decimal
from get_license_type import License
from get_maturity import Maturity
from get_contributor import Contributor
from get_popularity_rating import Popularity
from get_development_lang import Developmet_Lang
from get_testibility import Testibility
from get_support import Professional_Support
from get_maintainability import Maintainability
from get_security import Security
from get_reliability import Reliability
from get_code_quality import CodeQuality
from get_document import Document
from get_project_size import ProjectSize
from get_comminity_size import CommunitySize
from get_available_forum import AvailableForum
from utils import get_days

# Connect to AWS services
s3 = boto3.resource('s3')
dynamo = boto3.resource('dynamodb')
ec2 = boto3.resource('ec2')
is_local = 'AWS_SAM_LOCAL' in os.environ
sonar_username = os.environ["EC2_SONAR_USERNAME"]
sonar_password = os.environ["EC2_SONAR_PASS"]
s3_bucket_name = os.environ["S3_BUCKET"]
oss_table_name = os.environ["OSS_TABLE"]

def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': str(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def get_filename(link):
    result = re.search(r"([\w\d\-]+)\.json$", link)
    group = result.groups()
    name = group[0]
    return name

def get_sonar_info(owner: str, repo: str) -> dict:
    # Get sonarqube info from API
    metrics = [
        'ncloc',
        'complexity',
        'violations',
        'comment_lines',
        'complexity',
        'files',
        'security_rating',
        'duplicated_lines',
        'reliability_rating',
        'file_complexity',
        'sqale_rating',
        'comment_lines_density',
        'lines',
        'functions'
    ]
    
    # Get all metrics from SonarQube server
    sonarqube_name = os.environ["EC2_SONAR_SERVER"]
    instances = ec2.Instance(sonarqube_name)

    if instances.state["Name"] != "running":
        raise ValueError("Please turn on the sonarqube server")

    ec2_ip_address = instances.public_ip_address
    response = requests.get(f'http://{ec2_ip_address}:9000/api/measures/component', 
        auth=(sonar_username, sonar_password), 
        params={
            'component': f"{owner}:{repo}",
            'metricKeys': ','.join(metrics)
    })

    return response.json()

def get_logo(repo):
    if 'owner' in repo:
        if 'avatar_url' in repo['owner']:
            return repo['owner']['avatar_url']
    return ""

def lambda_handler(event, context):
    print(event)
    data = event
    owner = data['owner']
    repo = data["repo"]
    tmp_folder = '/tmp'
    project_row = {}
    json_files = {}

    # Download all files and store to /tmp folder
    bucket = s3.Bucket(s3_bucket_name)
    file_list = bucket.objects.filter(Prefix=f"{owner}/{repo}")
    
    for obj in file_list:
        json_filename = get_filename(obj.key)
        output_path = tmp_folder + '/' + json_filename
        bucket.download_file(obj.key, output_path)
        with open(output_path, 'r') as f:
            json_files[json_filename] = json.load(f)

    # Download sonarqube metrics
    json_files['sonar-info'] = get_sonar_info(owner, repo)

    # Calculate value, score base on given key, function, file name
    func_list = [
        ('license', License), 
        ('maturity', Maturity),
        ('security', Security),
        ('document', Document),
        ('popularity', Popularity),
        ('contributor', Contributor),
        ('testibility', Testibility),
        ('reliability', Reliability),
        ('code_quality', CodeQuality),
        ('project_size', ProjectSize),
        ('community_size', CommunitySize),
        ('maintainability', Maintainability),
        ('development_lang', Developmet_Lang),
        ('availavility_forum', AvailableForum),
        ('professional_support', Professional_Support)
    ]

    for field, Class_n in func_list:
        print('calculate quality:', field)
        calculator = Class_n(json_files)
        value = calculator.get_value()
        score = calculator.get_score()
        desc = calculator.desc()
        project_row[f"{field}_score"] = score
        project_row[f"{field}_value"] = value
        project_row[f"{field}_label"] = str(calculator)
        project_row[f"{field}_desc"] = desc

    # Creating project info record
    repo_info = json_files.get("repo-info")
    project_row['id'] = repo_info["full_name"]
    project_row["name"] = repo_info["name"]
    project_row["created_at"] = repo_info["created_at"]
    project_row["updated_at"] = repo_info["updated_at"]
    project_row["description"] = repo_info["description"]
    project_row["stars"] = str(repo_info["stargazers_count"])
    project_row["website"] = repo_info["homepage"]
    project_row["topics"] = ", ".join(repo_info["topics"])
    project_row["logo"] = get_logo(repo_info)
    project_row["github_url"] = f"https://github.com/{owner}/{repo}"
    project_row['day_since_created'] = str(get_days(repo_info["created_at"]))
    project_row["forks"] = str(repo_info["forks"])
    project_row["used_by"] = str(json_files["user"]["used_by"])
    project_row['analysed_at'] = str(datetime.now())

    # Save/Update project to table
    oss_table = dynamo.Table(oss_table_name)
    item = json.loads(json.dumps(project_row), parse_float=Decimal)
    oss_table.put_item(Item=item)

    return respond(None, project_row)
