from Calculator import ScoreCalculator

class Document(ScoreCalculator):
    """ 
    Document = Code Comment = 
    Number of Comment Lines / Number of Line of Code + Number of Comment Lines
    """
    def __init__(self, data: dict) -> None:
        self.metric_key = "document"
        self.sonar = data['sonar-info']
        self.files = data["files"] if 'files' in data else None
        self.metrics = self.sonar['component']['measures']
        self.comment_lines = 0
        self.code_lines = 0
        self.total_markdown = 0
        self.total_files = 0

    def get_total_markdown(self):
        total = 0

        if self.files is not None and 'markdown' in self.files:
            total = int(self.files['markdown'])
        
        return total
    
    def get_metric(self, metrics: dict, key: str):
        for item in metrics:
            if item['metric'] == key:
                return item['value']
        return 0

    def get_comment_lines(self):
        code_comment = self.get_metric(self.metrics, 'comment_lines')
        return int(code_comment)

    def get_code_lines(self):
        total_lines = self.get_metric(self.metrics, 'ncloc')
        return int(total_lines)

    def get_totle_files(self):
        if self.files is not None and 'files' in self.files:
            return int(self.files['files'])
        else:
            files = self.get_metric(self.metrics, 'files')
            return int(files)
    
    def get_markdown_density(self):
        self.total_markdown = self.get_total_markdown()
        self.total_files = self.get_totle_files()
        
        if self.total_files == 0:
            return 0
        else:
            return round((self.total_markdown/ self.total_files), 3)

    def get_comment_density(self) -> float:
        self.comment_lines = self.get_comment_lines()
        self.code_lines = self.get_code_lines()
        
        if (self.code_lines + self.comment_lines == 0):
            return 0
        else:
            return round(self.comment_lines / (self.comment_lines + self.code_lines), 3)
    
    def get_value(self): 
        m1 = self.get_comment_density()
        m2 = self.get_markdown_density()
        return round(m1 + m2, 3)
    
    def get_score(self) -> float:
        self.value = self.get_value()
        return round(((self.value / 2) * 100), 2)

    def __str__(self) -> str:
        comment_percent =  round(self.get_comment_density() * 100, 2)
        markdown_percent = round(self.get_markdown_density() * 100, 2)
        return f"{comment_percent}/{markdown_percent}"
    
    def to_json(self) -> dict:
        data =  super().to_json()
        data['comment_lines'] = self.comment_lines
        data['code_lines'] = self.code_lines
        data['total_markdown'] = self.total_markdown
        data['total_files'] = self.total_files
        return data

