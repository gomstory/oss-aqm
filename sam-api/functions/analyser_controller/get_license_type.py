from Calculator import ScoreCalculator

class License(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.metric_key = "license_type"
        self.license_info = data['license']
        self.repo_info = data["repo-info"]

    def get_value(self) -> str:
        self.value = 'none'
        
        if 'license' in self.license_info:
            license = self.license_info['license']['key']
            self.value = license
        elif 'license' in self.repo_info:
            license = self.repo_info['license']['key'] if self.repo_info['license'] is not None else 'none'
            self.value = license

        return self.value

    def get_score(self) -> float:
        switcher = {
            "none":         1,
            "other":        1,
            "gpl-2.0":      2,
            "lgpl-2.1":     2,
            "mpl-2.0":      3, 
            "gpl-3.0":      3,
            "epl-2.0":      3,
            "agpl-3.0":     3,
            "cc0-1.0":      4,
            "bsl-1.0":      4,
            "bsd-2-clause": 4,
            "bsd-3-clause": 4,
            "unlicense":    4,
            "mit":          5,
            "apache-2.0":   5,
        }

        range = switcher.get(self.value, 1)
        self.score = round((range / 5) * 100, 2)
        return self.score

    def __str__(self) -> str:
        switcher = {
            "other":        "Undefined",
            "none":         "Undefined",
            "gpl-2.0":      "GPL-2.0",
            "lgpl-2.1":     "LGPL-2.1",
            "mpl-2.0":      "MPL-2.0", 
            "gpl-3.0":      "GPL-3.0",
            "epl-2.0":      "EPL-2.0",
            "agpl-3.0":     "AGPL-3.0",
            "cc0-1.0":      "CC0-1.0",
            "bsl-1.0":      "BSL-1.0",
            "bsd-2-clause": "BSD-2-Clause",
            "bsd-3-clause": "BSD-3-Clause",
            "unlicense":    "The Unlicense",
            "mit":          "MIT",
            "apache-2.0":   "Apache 2.0",
        }

        license = switcher.get(self.value, "None")
        return str(license)