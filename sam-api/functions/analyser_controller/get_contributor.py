from Calculator import ScoreCalculator

"""
    Metric: Get Contributor
    Description: The number of core developer and contributor in the last 6 month
"""
class Contributor(ScoreCalculator):
    """Aka of Support Contributor"""
    def __init__(self, data: dict) -> None:
        self.value = 0
        self.score = 0
        self.contributors = data['contributor'] if 'contributor' in data else []
        self.core_team = data['core-team'] if 'core-team' in data else []

    def get_value(self):
        """Number of Support Contributor + Core Team"""
        self.value = len(self.contributors) + len(self.core_team)
        return self.value

    def get_score(self):
        """Calculate Contributor score"""
        score = 0
        total_contributors = self.value

        if total_contributors < 5:
            score = 1
        elif total_contributors >= 5 and total_contributors <= 10:
            score = 2
        elif total_contributors > 10 and total_contributors <= 20:
            score = 3
        elif total_contributors > 20 and total_contributors <= 50:
            score = 4
        elif total_contributors > 50:
            score = 5

        self.score =  (score / 5) * 100
        return self.score