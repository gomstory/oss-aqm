from Calculator import ScoreCalculator
from datetime import datetime, timedelta
from dateutil import parser
import re

class PerformanceIssue(ScoreCalculator):
    """
    Factor: Perfomance
    Metric: Lack of Performance Issues (V19)
    """
    def __init__(self, data: dict) -> None:
        self.metric_key = 'performance'
        self.issue_and_pull_requests = data['issue'] if 'issue' in data else []
        self.total_issues = 0
        self.performance_issues = 0
        self.performance_tags = [
            'performance', 
            'space', 
            'response time', 
            'latency', 
            'transit delay', 
            'miss', 
            'rate', 
            'loss', 
            'workload', 
            'capacity',
            'computation', 
            'speed', 
            'throughput',
            'memory usage',
            'accuracy',
            'efficiency'
        ]

    def get_issues(self) -> list:
        self.issues = list(filter(lambda x: (('pull_request' in x) == False), self.issue_and_pull_requests))
        return self.issues

    def get_value(self) -> float:
        issues = self.get_issues()
        last_6_months = datetime.today() - timedelta(days=180)
        keywords = '(?:% s)' % '|'.join(self.performance_tags)
        performance_issues = []

        # Find new feature in title or body
        for issue in issues:
            # Check date must be in 6 months
            date = issue['updated_at'] if 'updated_at' in issue else issue['created_at']
            issue_date = parser.parse(date)
            if (issue_date.date() < last_6_months.date()):
                continue

            # Check new feature in title
            title = issue['title'] or ""
            if re.search(keywords, title):
                performance_issues.append(issue)
                continue

            # Check new feature in body
            body = issue['body'] or ""
            if re.search(keywords, body):
                performance_issues.append(issue)
                continue
            
            # Check new feature in label
            labels = map(lambda x: x['name'], issue['labels']) if 'labels' in issue else []
            label_text = " ".join(labels)
            if re.search(keywords, label_text):
                performance_issues.append(issue)
                continue

        self.total_issues = len(issues)
        self.performance_issues = len(performance_issues)
        self.value = self.performance_issues
        return self.performance_issues

    def get_score(self) -> float:
        if self.performance_issues == 0:
            self.score = 100
            return self.score
        else:
            self.score = (1 - (self.performance_issues / self.total_issues)) * 100
            return round(self.score, 2)

    def __str__(self) -> str:
        return f"{self.performance_issues}/{self.total_issues}"
    
    def to_json(self) -> dict:
        date = super().to_json()
        date['performance_issues'] = self.performance_issues
        date['total_issues'] = self.total_issues
        return date