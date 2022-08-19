from Calculator import OSS_Calculator
class Developmet_Lang(OSS_Calculator):
    def __init__(self, data: dict) -> None:
        self.languages = data['language']

    def get_value(self):
        """Get primary language in the project code"""
        langs = self.languages
        sorted_langs = sorted(langs.items(), key=lambda x: x[1], reverse=True)
        name, value = sorted_langs[0]
        self.value = str.lower(name)
        return self.value


    def get_score(self):
        primary_lang = self.value
        switcher = {
            'julia': 1, 'cobol': 1, 'pascal': 1, 'fortran': 1,
            'rust': 2, 'objective-c': 2, 'dart': 2, 'scala': 2,
             'perl': 2, 'haskell': 2, 'kotlin': 3, 'ruby': 3, 'assembly': 3, 
             'vba': 3, 'swift': 3, 'r': 3, 'typescript': 4, 'php': 4, 'c#': 4, 
             'c++': 4, 'c': 4, 'go': 4, 'javascript': 5, 'html': 5, 'css': 5, 
             'python': 5, 'sql': 5, 'java': 5, 'shall': 5, 'bash': 5, 'powershell': 5
        }

        range = switcher.get(primary_lang, 1)
        return (range / 5) * 100
