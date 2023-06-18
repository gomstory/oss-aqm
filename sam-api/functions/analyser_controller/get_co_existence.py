from Calculator import ScoreCalculator

class Co_Existence(ScoreCalculator):
    def __init__(self, data: dict) -> None:
        self.metric_key = "co_existence"
        self.languages = data['language']
        self.platforms = 0

    def get_value(self):
        """Get primary language in the project code"""
        langs = self.languages
        sorted_langs = sorted(langs.items(), key=lambda x: x[1], reverse=True)
        name, value = sorted_langs[0]
        self.value = str.lower(name)
        return self.value


    def get_score(self) -> float:
        primary_lang = self.value
        # language : how many platform are supported
        # https://spectrum.ieee.org/top-programming-languages-2021
        switcher = {
            'python': 3,
            'java': 3, 
            'c++': 3, 
            'c': 3, 
            'javascript': 2, 
            'c#': 4, 
            'r': 1, 
            'go': 2, 
            'html': 1, 
            'css': 1, 
            'swift': 2, 
            'kotlin': 2, 
            'typescript': 2, 
            'php': 1, 
            # Based on https://techviral.net/best-popular-programming-languages/
            'objective-c': 2, 
            'julia': 1, 
            'cobol': 1, 
            'pascal': 1, 
            'fortran': 1,
            'rust': 2, 
            'dart': 1, 
            'scala': 2,
            'perl': 2, 
            'haskell': 2, 
            'ruby': 1, 
            'assembly': 1, 
            'vba': 1, 
            'sql': 1, 
            'shall': 1, 
            'bash': 1, 
            'powershell': 1,
            'arduino': 1,
            'matlab': 1,
            'cuda': 1,
            'lua': 2,
            'processing': 2,
            'delphi': 2,
            'd': 2,
            'lisp': 1,
            'vhdl': 1,
            'labview': 2,
            'erlang': 2,
            'ladder logic': 1,
            'verilog': 1,
            'prolog': 1,
            'clojure': 2,
            'sas': 1,
            'ada': 2,
            'abap': 1,
            'scheme': 2,
            'j': 1,
            'tcl': 2,
            'actionscript': '2',
            'ocaml': 2,
            'forth': 1
        }

        platform_supported = switcher.get(primary_lang, 1)
        m = 1

        if platform_supported == 1:
            m = 1
        elif platform_supported >= 2 and platform_supported <= 3:
            m = 3
        elif platform_supported >= 4:
            m = 5

        self.score = round((m / 5) * 100, 2)
        self.platforms = platform_supported
        return self.score
    
    def to_json(self) -> dict:
        data = super().to_json()
        data['platform_supported'] = self.platforms
        return data
    
    def __str__(self) -> str:
        return f"{self.value}/{self.platforms} platform(s)"
