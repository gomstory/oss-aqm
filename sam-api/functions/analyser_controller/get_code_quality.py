from Calculator import ScoreCalculator

class CodeQuality(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.duplicated_lines = 0
        self.lines = 0

    def find_metric(self, key):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']

    def get_value(self):
        self.duplicated_lines = self.find_metric('duplicated_lines')
        self.lines = self.find_metric('lines')
        self.value = int(self.duplicated_lines) / int(self.lines)
        return self.value

    def get_score(self):
        self.score = (1 - self.value) * 100
        return self.score

    def __str__(self) -> str:
        return f"{self.duplicated_lines}/{self.lines}"