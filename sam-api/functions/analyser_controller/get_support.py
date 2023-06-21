from Calculator import ScoreCalculator

class Professional_Support(ScoreCalculator):
    """Quality of Profession Support"""
    def __init__(self, data: dict) -> None:
        self.metric_key = 'professional_support'
        self.issue_and_pull_requests = data['issue'] if 'issue' in data else []
        self.issues = []
        self.issues_supported = []
        self.pull_requests = []
        self.supported_pull_requests = []
        self.issue_support_rate = 0
        self.pull_request_support_rate = 0

    def get_issues(self) -> list:
        self.issues = list(filter(lambda x: (('pull_request' in x) == False), self.issue_and_pull_requests))
        return self.issues

    def get_supported_issues(self):
        self.issues_supported = list(filter(lambda x: (int(x['comments']) > 0 or x['state'] == 'closed' or len(x['assignees']) > 0), self.issues))
        return self.issues_supported

    def get_pull_requests(self) -> list:
        self.pull_requests = list(filter(lambda x: (('pull_request' in x) == True), self.issue_and_pull_requests))
        return self.pull_requests

    def get_supported_pull_requests(self) -> list:
        self.supported_pull_requests = list(filter(lambda x: (int(x['comments']) > 0 or x['state'] == 'closed' or len(x['assignees']) > 0), self.pull_requests))
        return self.supported_pull_requests

    def get_value(self) -> float:
        issues = self.get_issues()
        issue_with_support = self.get_supported_issues()
        pull_requests = self.get_pull_requests()
        pull_request_with_support = self.get_supported_pull_requests()
        self.issue_support_rate = (len(issue_with_support) / len(issues)) if len(issues) > 0 else 0
        self.pull_request_support_rate = (len(pull_request_with_support) / len(pull_requests)) if len(pull_requests) > 0 else 0
        self.value = (self.issue_support_rate + self.pull_request_support_rate) / 2
        return round(self.value, 2)

    def get_score(self) -> float:
        value = self.get_value()
        self.score = value * 100
        return round(self.score, 2)

    def __str__(self) -> str:
        issue_rate = "{:.2f}".format(self.issue_support_rate * 100)
        pr_rate = "{:.2f}".format(self.pull_request_support_rate * 100)
        return f"{issue_rate}/{pr_rate}"
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['total_issue'] = len(self.issues)
        data['total_pr_supported'] = len(self.supported_pull_requests)
        data["total_issue_supported"] = len(self.issues_supported)
        return data