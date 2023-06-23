import scipy

""" 
Kendall Tau Correlation เป็นการหาความสัมพันธ์ระหว่างตัวแปร 2 ตัวที่อยู่ในมาตราการวัดระดับ Ordinal Scale โดยปกติจะมีค่าอยู่ระหว่าง -1.00 ถึง 1.00
- ถ้ามีค่าติดลบหมายความว่า ตัวแปร 2 ตัวมีความสัมพันธ์ในทิศทางตรงกันข้าม
- ถ้ามีค่าเป็นบวกหมายความว่า ตัวแปร 2 ตัวมีความสัมพันธ์ในทิศทางเดียวกัน
- ถ้ามีค่าเป็น 0 หมายความว่าตัวแปร 2 ตัวไม่มีความสัมพันธ์กัน
"""

"""
Web Framwork:
1. React.js /
2. Angular /
3. Vue.js /
4. JQuery / 
5. Next /
6. Svelte /
7. Ember /
8. Nuxt /
"""
oss_aqm = [6, 4, 7, 2, 1, 5, 3, 8]
sources = {
    'user_votes': [1,2,3,4,5,6,7,8],
    'github_stars': [1,4,2,6,3,5,7,8],
    'deps.dev': [4,3,8,1,7,5,2,6],
    'chat_gpt': [1,3,2,8,5,4,6,7],
}

for key, value in sources.items():
    x1 = oss_aqm
    x2 = value
    tau, p_value = scipy.stats.kendalltau(x1, x2)
    print('oss-qam vs', key, tau)

print('-----peason corelation-----')
for key, value in sources.items():
    x1 = oss_aqm
    x2 = value
    tau, p_value = scipy.stats.pearsonr(x1, x2)
    print('oss-qam vs', key, tau)

