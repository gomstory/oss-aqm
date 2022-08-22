import Calculator

class ProjectSize(Calculator.OSS_Calculator):
    def __init__(self, data: dict) -> None:
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.size_label = "XS"

    def find_metric(self, key: str):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']

    def get_value(self) -> dict:
        lines = self.find_metric('lines')
        self.value = int(lines)
        return self.value

    def get_score(self) -> dict:
        lines = self.value

        if (lines < 1000):
            self.size_label = "XS"
        elif lines >= 1000 and lines < 10000:
            self.size_label = "S"
        elif lines >= 10 and lines < 100000:
            self.size_label = "M"
        elif lines >= 10000 and lines < 500000:
            self.size_label = "L"
        elif lines > 500000:
            self.size_label = "XL"

        self.score = self.size_label
        return self.score
