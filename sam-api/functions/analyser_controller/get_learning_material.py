from Calculator import ScoreCalculator

class LearningMaterial(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        super().__init__()
        self.metric_key = "learning_material"
        self.book = data['book'] if 'book' in data else {}
        self.course = data['course'] if 'course' in data else {}
        self.total_book = 0
        self.total_course = 0

    def get_total_book(self) -> int:
        return int(self.book['totalItems']) if 'totalItems' in self.book else 0
    
    def get_total_course(self) -> int:
        return len(self.course['items']) if 'items' in self.course else 0
    
    def get_value(self) -> int:
        self.total_book = self.get_total_book()
        self.total_course = self.get_total_course()
        total_material = self.total_book + self.total_course
        self.value = total_material
        return self.value

    def get_score(self) -> float:
        total_material = self.get_value()
        range = 1

        if total_material > 15:
            range = 5
        elif total_material > 6:
            range = 4
        elif total_material > 3:
            range = 3
        elif total_material >= 1:
            range = 2
        elif total_material == 0:
            range = 0

        self.score = round((range/5) * 100, 2)
        return self.score
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['books'] = self.get_total_book()
        data['course'] = self.get_total_course()
        return data
    
    def __str__(self) -> str:
        return f"{self.total_book}/{self.total_course}"
    
if __name__ == "__main__":
    data = {
        "book": {"totalItems": 1},
        "course": {"items": 0}
    }

    lm = LearningMaterial(data)
    print(lm.to_json())
