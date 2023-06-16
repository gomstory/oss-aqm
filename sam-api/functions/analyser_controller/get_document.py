from Calculator import ScoreCalculator

class Document(ScoreCalculator):
    """ 
    Document = Code Comment = 
    Number of Comment Lines / Number of Line of Code + Number of Comment Lines
    """
    def __init__(self, data: dict) -> None:
        self.metric_key = "document"
        self.sonar = data['sonar-info']
        self.metrics = self.sonar['component']['measures']
        self.comment_lines = 0
        self.code_lines = 0

    def get_metric(self, metrics: dict, key: str):
        for item in metrics:
            if item['metric'] == key:
                return item['value']
        return 0

    def get_comment_lines(self):
        """Number of lines containing either comment or commented-out code."""
        code_comment = self.get_metric(self.metrics, 'comment_lines')
        return int(code_comment)

    def get_code_lines(self):
        """
        Number of physical lines that contain at least one character 
        which is neither a whitespace nor a tabulation nor part of a comment.
        """
        total_lines = self.get_metric(self.metrics, 'ncloc')
        return int(total_lines)

    def get_value(self) -> dict:
        """Get Code Comment Line Density"""
        self.comment_lines = self.get_comment_lines()
        self.code_lines = self.get_code_lines()
        self.value = round(self.comment_lines / (self.comment_lines + self.code_lines), 2)
        return self.value

    def get_score(self) -> dict:
        """Convert to (0,100) score rank"""
        self.score = self.value * 100
        return round(self.score, 2)

    def __str__(self) -> str:
        return f"{self.comment_lines}/{self.code_lines}"
    
    def to_json(self) -> dict:
        data =  super().to_json()
        data['comment_lines'] = self.comment_lines
        data['code_lines'] = self.code_lines
        return data

