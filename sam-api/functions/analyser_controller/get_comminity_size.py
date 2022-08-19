
from Calculator import OSS_Calculator

class Community_Score(OSS_Calculator):
    
    def __init__(self, data: dict) -> None:
        self.data = data['release_info']

    def get_value():
        return 0

    def get_score():
        return 0

if __name__ == "__main__":
    data = {
        'repo_info': {
            "name": '1234'
        },
        'release_info': {
            "name": 'release'
        }
    }

    s = Community_Score(data)
    print(s.data)