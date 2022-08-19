
# Metric: Popularity Rating Score
# Description: How much repository popularity
from Calculator import OSS_Calculator

class Popularity(OSS_Calculator):
    def __init__(self, data: dict) -> None:
        self.repo_info = data['repo-info']

    def get_value(self):
        data = self.repo_info
        star = data['stargazers_count'] if 'stargazers_count' in data else 0
        number_watcher = data['watchers'] if 'watchers' in data else 0
        self.value = (star / number_watcher)
        return self.value

    def get_score(self):
        star_per_watcher = self.value

        if star_per_watcher > 1:
            star_per_watcher = 1

        self.score = (star_per_watcher) * 100
        
        return self.score