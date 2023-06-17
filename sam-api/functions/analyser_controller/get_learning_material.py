from Calculator import ScoreCalculator

class LearningMaterial(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        super().__init__()
        self.metric_key = "learning_material"
        self.book = data['book'] if 'book' in data else {}
        self.course = data['course'] if 'course' in data else {}

    def get_total_book(self) -> int:
        return int(self.book['totalItems']) if 'totalItems' in self.book else 0
    
    def get_total_course(self) -> int:
        return len(self.course['items']) if 'items' in self.course else 0
    
    def get_value(self) -> int:
        total_book = self.get_total_book()
        total_course = self.get_total_course()
        total_material = total_book + total_course
        self.value = total_material
        return self.value

    def get_score(self):
        total_material = self.get_value()
        range = 1

        if total_material == 0:
            range = 1
        elif total_material >= 1 and total_material <= 3:
            range = 2
        elif total_material > 3 and total_material <= 6:
            range = 3
        elif total_material > 6 and total_material <= 15:
            range = 4
        elif total_material > 15:
            range = 5

        self.score = (range/5) * 100
        return self.score
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['books'] = self.get_total_book()
        data['course'] = self.get_total_course()
        return data
    

if __name__ == "__main__":
    data = {
        "book": {"totalItems": 1},
        "course": {"items": 0}
    }

    lm = LearningMaterial(data)
    print(lm.to_json())
