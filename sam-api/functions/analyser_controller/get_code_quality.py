from Calculator import ScoreCalculator

class CodeQuality(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']

    def find_metric(self, key):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']

    def get_value(self):
        duplicated_lines = self.find_metric('duplicated_lines')
        lines = self.find_metric('lines')
        self.value = int(duplicated_lines) / int(lines)
        return self.value

    def get_score(self):
        self.score = (1 - self.value) * 100
        return self.score