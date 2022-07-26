from Calculator import ScoreCalculator

class Professional_Support(ScoreCalculator):
    """Quality of Profession Support 
    Number of supporters who respond to issues in the past 6 months. If there are no reported issues, 
    it is a sign that information and help has been provided sufficiently 
    for users to efficiently resolve issues that they come across.
    """
    def __init__(self, data: dict) -> None:
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
        return self.value

    def get_score(self) -> float:
        self.score = self.value * 100
        return self.score

    def __str__(self) -> str:
        issue_rate = "{:.2f}".format(self.issue_support_rate)
        pr_rate = "{:.2f}".format(self.pull_request_support_rate)
        return f"{issue_rate}/{pr_rate}"