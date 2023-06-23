from Calculator import ScoreCalculator
from datetime import datetime, timedelta
from dateutil import parser


class ContinuingChange(ScoreCalculator):
    """
    Factor: Compatetivensss
    Metric: Continuing Change (V12)
    """
    def __init__(self, data: dict) -> None:
        self.metric_key = 'continuing_change'
        self.issue_and_pull_requests = data['issue'] if 'issue' in data else []
        self.total_pull_requests = 0

    def get_pull_requests(self) -> list:
        if len(self.issue_and_pull_requests) == 0: return []
        return list(filter(lambda x: (('pull_request' in x) == True), self.issue_and_pull_requests))
    
    def generate_30_days(self):
        today = datetime.today()
        dates = dict[str, int]()

        for x in range(30):
            date = today.date() - timedelta(days=x)
            dates[str(date)] = 0

        return dates

    def get_value(self) -> float:
        last_30_days = self.generate_30_days()
        pull_requests = self.get_pull_requests()
        total_count = 0
        
        # Count every 30 day pull requests
        for pr in pull_requests:
            created_date = pr['updated_at'] if 'updated_at' in pr else pr['created_at']
            
            if created_date is None:
                continue

            date = str(parser.parse(created_date).date())
            if date in last_30_days:
                last_30_days[date] += 1
        
        # Count last 30 day
        for date, value in last_30_days.items():
            if value > 0:
                total_count = total_count + 1

        self.value = total_count
        self.total_pull_requests = len(pull_requests)
        return self.value

    def get_score(self) -> float:
        self.score = round(((self.value / 30) * 100), 2)
        return self.score

    def __str__(self) -> str:
        return f"{self.value}/30"
    
    def to_json(self) -> dict:
        date = super().to_json()
        date['pull_request_frequency'] = self.value
        date['total_pull_requests'] = self.total_pull_requests
        return date