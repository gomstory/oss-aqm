from Calculator import ScoreCalculator

class CodeQuality(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.metric_key = "code_quality"
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.duplicated_lines_score = 0
        self.avg_cyclomatic_score = 0
        self.duplicate_density = 0
        self.duplicated_lines = 0
        self.avg_complexity = 0
        self.lines = 0

    def find_metric(self, key):
        for item in self.metrics:
            if item['metric'] == key:
                return item['value']
        return 0

    def get_unduplicated_line(self):
        self.duplicated_lines = self.find_metric('duplicated_lines')
        self.lines = self.find_metric('lines')

        if self.lines == 0:
            self.duplicated_lines_score = 0
        else:
            duplicated_ratio = float(self.duplicated_lines) / float(self.lines)
            unduplicate_ratio = (1 - duplicated_ratio)
            self.duplicated_lines_score = round(unduplicate_ratio, 2)
        return self.duplicated_lines_score

    def get_uncomplex_code(self):
        complexity = self.find_metric('file_complexity')
        avg_cyclomatic = float(complexity)
        rank = 1
        
        if avg_cyclomatic > 50:
            rank = 1
        elif avg_cyclomatic >= 21 and avg_cyclomatic <= 50:
            rank = 2
        elif avg_cyclomatic >= 11 and avg_cyclomatic <= 20:
            rank = 3
        elif avg_cyclomatic >= 1 and avg_cyclomatic <= 10:
            rank = 4  

        self.avg_complexity = avg_cyclomatic
        self.avg_cyclomatic_score = (rank / 4)
        return self.avg_cyclomatic_score
    
    def get_value(self) -> float:
        dup = self.get_unduplicated_line()
        cyclo = self.get_uncomplex_code()
        self.value = (dup + cyclo) / 2
        return self.value

    def get_score(self) -> float:
        self.score = round((self.value * 100), 2)
        return self.score

    def __str__(self) -> str:
        unduplicated_percent = round(self.duplicated_lines_score * 100, 2)
        uncomplex_percent = round(self.avg_cyclomatic_score * 100, 2)
        return f"{uncomplex_percent}/{unduplicated_percent}"
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['duplicated_lines'] = int(self.duplicated_lines)
        data['avg_complexity'] = round(self.avg_complexity, 3)
        data['lines'] = int(self.lines)
        return data