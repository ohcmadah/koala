import os
import pandas as pd
import json

# pip install pandas
# pip install xlrd

current_path = os.path.dirname(os.path.realpath(__file__))
os.chdir(current_path)

# ncov.mohw.go.kr
data_path = './corona_route_data.xlsx'
corona_route_data = pd.read_excel(data_path)

route_list = []
for i in range(len(corona_route_data['지역'])):
    route_dict = {}
    for name in corona_route_data:
        route_dict[name] = corona_route_data[name][i]
    route_list.append(route_dict)

with open('./corona_route_data.json', 'w', encoding='utf-8') as out_file:
    route_json = json.dumps(route_list, indent=2, ensure_ascii=False)
    out_file.write(route_json)