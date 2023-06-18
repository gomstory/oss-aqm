from Calculator import ScoreCalculator
from datetime import datetime, timedelta
from dateutil import parser
import re

class NewFeature(ScoreCalculator):
    """
    Factor: Innovativeness
    Metric: New Feature (V11)
    """
    def __init__(self, data: dict) -> None:
        self.metric_key = 'new_feature'
        self.issue_and_pull_requests = data['issue'] if 'issue' in data else []
        self.new_feature_tags = ['feature', 'new feature', 'user request', 'redesign', 'new function', 'new item', 'new component']
        self.total_pull_requests = 0
        self.total_new_pull_requests = 0

    def get_pull_requests(self) -> list:
        if len(self.issue_and_pull_requests) == 0: return []
        return list(filter(lambda x: (('pull_request' in x) == True), self.issue_and_pull_requests))

    def get_value(self) -> float:
        pull_requests = self.get_pull_requests()
        new_pull_requests = []
        last_6_months = datetime.today() - timedelta(days=180)
        keywords = '(?:% s)' % '|'.join(self.new_feature_tags)

        # Find new feature in title or body
        for pr in pull_requests:
            # Check date must be in 6 months
            date = pr['updated_at'] if 'updated_at' in pr else pr['created_at']
            pr_date = parser.parse(date)
            if (pr_date.date() < last_6_months.date()):
                continue

            # Check new feature in title
            title = pr['title'] or ""
            if re.search(keywords, title):
                new_pull_requests.append(pr)
                continue

            # Check new feature in body
            body = pr['body'] or ""
            if re.search(keywords, body):
                new_pull_requests.append(pr)
                continue
            
            # Check new feature in label
            labels = map(lambda x: x['name'], pr['labels']) if 'labels' in pr else []
            label_text = " ".join(labels)
            if re.search(keywords, label_text):
                new_pull_requests.append(pr)
                continue

        self.total_pull_requests = len(pull_requests)
        self.total_new_pull_requests = len(new_pull_requests)
        self.value = self.total_new_pull_requests
        return round(self.total_new_pull_requests, 2) 

    def get_score(self) -> float:
        if self.total_pull_requests == 0:
            self.score = 0
            return 0
        else:
            self.score = (self.value / self.total_pull_requests) * 100
            return round(self.score, 2)

    def __str__(self) -> str:
        return f"{self.total_new_pull_requests}/{self.total_pull_requests}"
    
    def to_json(self) -> dict:
        date = super().to_json()
        date['total_pull_requests'] = self.total_pull_requests
        date['total_new_pull_requests'] = self.total_new_pull_requests
        return date