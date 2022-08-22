from Calculator import OSS_Calculator

"""
Metric: Get Contributor
Description: The number of core developer and contributor in the last 6 month
"""
class Contributor(OSS_Calculator):
    def __init__(self, data: dict) -> None:
        self.contributors = data['contributor'] if 'contributor' in data else []

    def get_value(self):
        """Number of Support Contributor + Core Team"""
        # TODO: Add core team to calculation
        self.value = len(self.contributors)
        return self.value

    def get_score(self):
        score = 0
        contributors = self.value
            
        if contributors < 5:
            score = 1
        elif contributors >= 5 and contributors <= 10:
            score = 2
        elif contributors > 10 and contributors <= 20:
            score = 3
        elif contributors > 20 and contributors <= 50:
            score = 4
        elif contributors > 50:
            score = 5

        self.score =  (score / 5) * 100

        return self.score