from Calculator import OSS_Calculator

class Professional_Support(OSS_Calculator):
    def __init__(self, data: dict) -> None:
        self.issue_and_pull_requests = data['issue']
        self.issues = []
        self.issues_supported = []

    def get_issues(self) -> list:
        self.issues = list(filter(lambda x: (('pull_request' in x) == False), self.issue_and_pull_requests))
        return self.issues

    def get_issue_supported(self):
        self.issues_supported = list(filter(lambda x: (int(x['comments']) > 0 or x['state'] == 'closed' or len(x['assignees']) > 0), self.issues))
        return self.issues_supported

    def get_value(self) -> float:
        issues = self.get_issues()
        issue_with_support = self.get_issue_supported()
        self.value = len(issue_with_support) / len(issues)
        return self.value

    def get_score(self) -> float:
        if self.value == 0:
            return 100
        elif self.value > 0:
            return self.value * 100