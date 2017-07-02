import json

with open('carga_inicial.json') as json_data:
    d = json.load(json_data)
    print(d)
