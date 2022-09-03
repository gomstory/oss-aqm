from Calculator import ScoreCalculator

class Popularity(ScoreCalculator):
    """
    Metric: Popularity Rating Score
    Description: How much repository popularity
    """

    def __init__(self, data: dict) -> None:
        self.repo_info = data['repo-info']
        self.number_users = 0
        self.stars = 0

    def get_value(self):
        # TODO: Fixes watcher == star, since 2012
        data = self.repo_info
        self.stars = data['stargazers_count'] if 'stargazers_count' in data else 0
        self.number_users = data['watchers'] if 'watchers' in data else 0
        self.value = (self.stars / self.number_users) if self.number_users > 0 else 0
        return self.value

    def get_score(self):
        star_per_watcher = self.value

        if star_per_watcher > 1:
            star_per_watcher = 1

        self.score = (star_per_watcher) * 100
        
        return self.score
    
    def __str__(self) -> str:
        return f"{self.stars}/{self.number_users}"