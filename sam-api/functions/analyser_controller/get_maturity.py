import re
from dateutil import parser
from Calculator import OSS_Calculator

class Maturity(OSS_Calculator):
    def __init__(self, data: dict) -> None:
        self.repo_info = data['repo-info']
        self.release_info = data['release']

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
        major_releases = []

        for release in data:
            version = release['tag_name']
            major_version = re.search(r"\w?(\d)", version)

            if major_version is not None:
                major = major_version.groups()[0]
                if (major in major_releases) == False:
                    major_releases.append(major)

        return len(major_releases)

    def get_release_score(self, number_of_major_release: int = 0) -> float:
        score_range = 1

        if number_of_major_release > 3: 
            score_range = 5
        elif number_of_major_release <= 3 and number_of_major_release > 1: 
            score_range = 3
        elif number_of_major_release <= 1: 
            score_range = 1

        return (score_range / 5)

    def get_age_score(self, days: int = 1) -> int:
        age_range = 0

        if days < 60: 
            # < 3 mo
            age_range = 1
        elif days >= 60 and days < 365: 
            # 3 mo - 1 years
            age_range = 2
        elif days >= 365 and days < 730: 
            # > 1-2 years
            age_range = 3
        elif days >= 730 and days < 1095: 
            # > 2-3 years
            age_range = 4
        elif days >= 1095: 
            # > 3 years
            age_range = 5
        
        return (age_range / 5)

    def get_value(self) -> float:
        days = self.get_age()
        total_release = self.get_release()
        age_score = self.get_age_score(days)
        release_score = self.get_release_score(total_release)
        return (age_score + release_score) / 2

    def get_score(self) -> float:
        score = self.get_value()
        return score * 100