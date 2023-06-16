import Calculator

class ProjectSize(Calculator.ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.metric_key = "project_size"
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.size_label = "XS"
        self.total_lines = 0

    def find_metric(self, key: str):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']
        return 0

    def get_value(self) -> str:
        total_lines = int(self.find_metric('lines'))

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

        self.total_lines = total_lines
        self.value = self.size_label
        return  self.value
    
    def get_score(self) -> int:
        self.score = 0
        return self.score

    def __str__(self) -> str:
        return self.value
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['total_lines'] = self.total_lines
        return data
