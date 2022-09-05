import re
import requests
from ruamel.yaml import YAML
from bs4 import BeautifulSoup
from dateutil import parser, relativedelta
from datetime import datetime, timedelta
import time as timer

BASE_URL = 'https://stackoverflow.com/questions/tagged/angular'
SORT = '?sort=Newest'
PAGE = '&page='
PAGE_SIZE_URL = '&pageSize='
PAGE_SIZE = 50
MAX_PAGE = 25

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


def crawl_pages(num_pages):
	start = 1
	current_page = start
	end = start + num_pages
	six_month_early = datetime.now() - timedelta(days=7)

	while current_page != end:
		try:
			page_url = BASE_URL + SORT + PAGE + \
				str(current_page) + PAGE_SIZE_URL + str(PAGE_SIZE)
			source_code = requests.get(
				page_url, headers=headers, timeout=10).text
			soup = BeautifulSoup(source_code, 'html.parser')
			q_no = 0
			result = {}

			print('Crawling:' + str(current_page) + ': ' + page_url)

			questions = soup.find_all(
				'div', {'id': re.compile(r"^question-summary-")})

			for question in questions:
				link = question.find('a')
				url = 'http://stackoverflow.com/' + link.get('href')
				title = question.find(
					class_="s-post-summary--content-title").getText()
				stats = question.find_all(
					'div', {'class': 's-post-summary--stats-item'}, limit=3)
				votes = stats[0].find("span").text
				answers = stats[1].find("span").text
				views = stats[2].find("span").text
				time = question.find('time')
				time_label = time.text
				time_sring = time.find('span').attrs.get("title")

				# Save Result
				remove_space_pattern = r"^\s+|\s+$"
				result["title"] = re.sub(remove_space_pattern, "", title)
				result["url"] = url
				result["votes"] = votes
				result["answers"] = answers
				result["views"] = views
				result['time'] = time_sring
				result["time_label"] = re.sub(remove_space_pattern, "", time_label)

				print("Question:", result["title"], " | ", result["time_label"], " | ", result["answers"])

				# Stop when question date time is 6 months old
				question_date = parser.parse(time_sring).replace(tzinfo=None)
				if question_date < six_month_early:
					print("Reached 6 months, stoping crawling data")
					current_page = end
					break
				else:
					q_no += 1

				if q_no == PAGE_SIZE:
					print("Go Next Page!")
					break

			# Slow down for 2 seconds
			if current_page < end:
				current_page += 1
				timer.sleep(2)
		
		except (KeyboardInterrupt, EOFError, SystemExit):
			print("\nStopped by user!")
			break


def main():
	crawl_pages(30)
	print('\nDone!')


main()
