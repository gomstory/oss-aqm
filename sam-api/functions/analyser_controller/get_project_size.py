import Calculator

class ProjectSize(Calculator.ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.size_label = "XS"

    def find_metric(self, key: str):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']

    def get_value(self) -> int:
        lines = self.find_metric('lines')
        self.value = int(lines)
        return self.value

    def get_score(self) -> dict:
        total_lines = self.value

        if (total_lines < 1000):
            self.size_label = "XS"
        elif total_lines >= 1000 and total_lines < 10000:
            self.size_label = "S"
        elif total_lines >= 10000 and total_lines < 100000:
            self.size_label = "M"
        elif total_lines >= 100000 and total_lines < 500000:
            self.size_label = "L"
        elif total_lines > 500000:
            self.size_label = "XL"

        self.score = self.size_label
        return self.score
