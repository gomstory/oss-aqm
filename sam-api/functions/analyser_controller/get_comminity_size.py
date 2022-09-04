
from get_contributor import Contributor

class CommunitySize(Contributor):
    def __init__(self, data: dict) -> None:
        super().__init__(data)
        self.users = data['user']['result'] if 'user' in data else []

    def get_value(self) -> int:
        """ Summation of contributors + core team members + users"""
        contributos = len(self.contributors)
        core = len(self.core_team)
        users = len(self.users)
        self.value = contributos + core + users
        return self.value

    def get_score(self) -> float:
        total_users = self.value
        scale_range = 1

        if total_users < 50:
            scale_range = 1
        elif total_users >= 50 and total_users < 100:
            scale_range = 2
        elif total_users >= 100 and total_users < 200:
            scale_range = 3
        elif total_users >= 200 and total_users < 300:
            scale_range = 4
        elif total_users > 300:
            scale_range = 5

        self.score = (scale_range/5) * 100
        return self.score

    def __str__(self) -> str:
        return "{:.0f}".format(self.value)