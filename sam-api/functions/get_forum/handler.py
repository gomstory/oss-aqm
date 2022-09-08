import json
import requests
import boto3
import os
import re
import time as timer
from bs4 import BeautifulSoup
from dateutil import parser, relativedelta
from datetime import datetime, timedelta

# Connect to AWS
bucket_name = os.environ['S3_BUCKET']
queue_name = os.environ['STOP_CRAWLER_QUEUE']
s3 = boto3.client('s3')
sqs = boto3.client('sqs')
headers = {
	'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
}

def get_days(created_date: str):
	now = datetime.now()
	temp = parser.parse(created_date)
	then = datetime(temp.year, temp.month, temp.day)
	diff = now - then
	days = diff.days
	return days

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
	repo = event['repo']
	owner = event["owner"]
	BASE_URL = f"https://stackoverflow.com/questions/tagged/{repo}"
	PAGE_SIZE = 50
	# 260 pages, takes 13 min calculation
	MAX_PAGE = 260 
	MAX_DAYS_PERIOD = 30
	start = 1
	current_page = start
	end = start + MAX_PAGE
	six_month_early = datetime.now() - timedelta(days=MAX_DAYS_PERIOD)
	rows = []
	
	while current_page != end:
		try:
			page_url = BASE_URL
			response = requests.get(page_url, headers=headers, params={
				'tab': 'Newest',
				'page': current_page,
				'pageSize': PAGE_SIZE
			}, timeout=10)
			
			source_code = response.text
			soup = BeautifulSoup(source_code, 'html.parser')
			q_no = 0

			# Check wheater URL has redirected
			reponse_url = response.url.split('?')[0]
			if page_url != reponse_url:
				BASE_URL = reponse_url

			print('Crawling:' + str(current_page) + ': ' + page_url)

			questions = soup.find_all(
				'div', {'class': "s-post-summary"}, limit=50)

			# TODO: questions is returned only 15 rows
			# Question is empty before page end (no more question)
			if len(questions) == 0:
				break
			
			for question in questions:
				# Html element tags
				link_tag = question.find('a')
				stats_tag = question.find_all('div', {'class': 's-post-summary--stats-item'}, limit=3)
				time_tag = question.find('time')

				url = 'http://stackoverflow.com/' + link_tag.get('href')
				title = question.find(class_="s-post-summary--content-title").getText()
				votes = stats_tag[0].find("span").text
				answers = stats_tag[1].find("span").text
				views = stats_tag[2].find("span").text
				time_label = time_tag.text
				time_str = time_tag.find('span').attrs.get("title")

				# Save Result
				result = {}
				remove_space_pattern = r"^\s+|\s+$"
				result["title"] = re.sub(remove_space_pattern, "", title)
				result["url"] = url
				result["votes"] = votes
				result["answers"] = answers
				result["views"] = views
				result['time'] = time_str
				result["time_label"] = re.sub(remove_space_pattern, "", time_label)
				rows.append(result)

				print("Question:", result["title"], " | ", result["time_label"], " | ", result["answers"])

				# Stop when question date time is 6 months old
				question_date = parser.parse(time_str).replace(tzinfo=None)
				if question_date < six_month_early:
					print("Reached 6 months, stoping crawling data")
					current_page = end
					break
				else:
					q_no += 1

				if q_no == PAGE_SIZE:
					print("Go Next Page!")
					break

			# Slow down for 1 seconds
			if current_page < end:
				current_page += 1
				timer.sleep(1)

		except (KeyboardInterrupt, EOFError, SystemExit):
			print("\nStopped by user!")
			break

	# Create json file to tmp folder
	file_name = 'forum.json'
	file_path = os.path.join('/tmp', repo, file_name)
	os.makedirs(os.path.dirname(file_path), exist_ok=True)
	with open(file_path, 'w') as f:
		json.dump(rows, f)

	# Upload S3 bucket
	destination_url = f"{owner}/{repo}/{file_name}"
	s3.upload_file(file_path, bucket_name, destination_url)

	# Add queue to inform completion
	response = sqs.send_message(
		QueueUrl=queue_name,
		MessageBody='forum_status',
		MessageDeduplicationId=destination_url,
		MessageGroupId=repo,
		MessageAttributes={
			'function_name': {
				'StringValue': 'get_forum',
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
