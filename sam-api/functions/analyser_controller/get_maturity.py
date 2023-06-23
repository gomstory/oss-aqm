import re
from datetime import datetime, timedelta
from dateutil import parser
from Calculator import ScoreCalculator

class Maturity(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.metric_key = "maturity"
        self.repo_info = data['repo-info']
        self.release_info = data['release']
        self.issue = data['issue'] if 'issue' in data else []
        self.total_age_day = 0
        self.total_issue = 0
        self.total_release = 0

    def get_age(self):
        """Project age from first created"""
        data = self.repo_info
        created_at = data['created_at']
        updated_at = data['updated_at']
        delta = parser.parse(updated_at) - parser.parse(created_at)
        total_days = delta.days
        return total_days

    def get_release(self):
        """Get only manjor release"""
        data = self.release_info
        minor_releases = []

        for release in data:
            version = release['tag_name']
            minor_release = re.findall(r"(\d+)", version)

            if minor_release is not None:
                major = minor_release[0]
                minor = minor_release[1]
                major_minor = f"{major}.{minor}"

                if (major_minor in minor_releases) == False:
                    minor_releases.append(major_minor)

        return len(minor_releases)

    def get_release_score(self, minor_release: int = 0) -> float:
        score_range = 1

        if minor_release > 3: 
            score_range = 5
        elif minor_release >= 1 and minor_release <= 3: 
            score_range = 3
        elif minor_release == 0: 
            score_range = 1

        return round((score_range / 5), 2)

    def get_age_score(self, days: int = 1) -> float:
        age_range = 0

        if days > 1095:
            # > 3 years
            age_range = 5
        elif days > 730:
            # > 2-3 years
            age_range = 4
        elif days > 365:
            # > 1-2 years
            age_range = 3
        elif days >= 60:
            # 2 mo - 1 years
            age_range = 2
        elif days < 60:
            # < 2 mo
            age_range = 1
        
        return round((age_range / 5), 2)

    def get_total_issue(self):
        """Get number of issues the last 6 months reported in Github"""
        today = datetime.now()
        six_month_early = today - timedelta(days=180)
        selected_issue = []
        
        for x in self.issue:
            date = datetime.strptime(x['created_at'], "%Y-%m-%dT%H:%M:%SZ")
            if date >= six_month_early:
                selected_issue.append(x)

        return len(selected_issue)

    def get_bugless_score(self, total_issue = 0) -> float:
        """Calcuate bugless score base on total issues"""
        bugless_ranking = 1

        if total_issue > 1000:
            bugless_ranking = 1
        elif total_issue > 500 and total_issue <= 1000:
            bugless_ranking = 2
        elif total_issue > 100 and total_issue <= 500:
            bugless_ranking = 3
        elif total_issue > 50 and total_issue <= 100:
            bugless_ranking = 4
        elif total_issue <= 50:
            bugless_ranking = 5

        return bugless_ranking / 5

    def get_value(self) -> float:
        """ Get total score avg of age, release, issues """
        days = self.get_age()
        age_score = self.get_age_score(days)
        total_release = self.get_release()
        release_score = self.get_release_score(total_release)
        issues = self.get_total_issue()
        issue_score = self.get_bugless_score(issues)
        self.total_release = total_release
        self.total_issue = issues
        self.total_age_day = days
        self.value = (age_score + release_score + issue_score) / 3
        return round(self.value, 3)

    def get_score(self) -> float:
        """Get Final score (0, 100] """
        self.score = self.value * 100
        return round(self.score, 2)

    def __str__(self) -> str:
        return f"{self.total_age_day}/{self.total_issue}/{self.total_release}"