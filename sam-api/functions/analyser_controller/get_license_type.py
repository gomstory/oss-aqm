from Calculator import ScoreCalculator

class License(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.license_info = data['license']
        self.repo_info = data["repo-info"]

    def get_value(self) -> str:
        self.value = 'none'
        
        if 'license' in self.license_info:
            license = self.license_info['license']['key']
            self.value = license
        elif 'license' in self.repo_info:
            license = self.repo_info['license']['key']
            self.value = license

        return self.value

    def get_score(self):
        switcher = {
            "none": 1,
            "gpl-2.0": 2,
            "lgpl-2.1": 2,
            "mpl-2.0": 3, 
            "gpl-3.0": 3,
            "epl-2.0": 3,
            "agpl-3.0": 3,
            "cc0-1.0": 4,
            "bsl-1.0": 4,
            "bsd-2-clause": 4,
            "bsd-3-clause": 4,
            "mit": 4,
            "unlicense": 4,
            "apache-2.0": 5,
        }

        range = switcher.get(self.value, 1)
        self.score = (range / 5) * 100
        return self.score