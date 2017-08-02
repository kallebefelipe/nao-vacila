import requests
from math import sin, cos, sqrt, atan2, radians
import json
import time


def distancia(lat1, lon1, lat2, lon2):
    # approximate radius of earth in km
    R = 6373.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    # print("Result:", distance)
    return distance


def lugar_perigoso(regioes_perigosas, ponto):
    for each in regioes_perigosas:
        dist = distancia(each[0], each[1], ponto['lat'], ponto['lng'])
        if dist < 0.5:
            return True
    return False


coordenadas = []
with open('dados.json') as json_data:
    d = json.load(json_data)
    for each in d:
        if each['latitude'] and each['longitude']:
            coordenadas.append([each['latitude'], each['longitude']])

regioes_perigosas = []
for i in range(0, len(coordenadas)):
    for j in range(i, len(coordenadas)):
        dist = distancia(coordenadas[i][0], coordenadas[i][1],
                         coordenadas[j][0], coordenadas[j][1])
        if dist != 0.0 and dist < 0.25:
            regioes_perigosas.append([coordenadas[i][0], coordenadas[i][1]])
            print(dist)

for each in regioes_perigosas:
    data = {}
    data['latitude'] = each[0]
    data['longitude'] = each[1]
    conectado = True
    s = requests.session()
    while conectado:
        # response = requests.post("http://webserver-nao-vacila.herokuapp.com/regioes_perigosas/", data)
        response = requests.post("http://127.0.0.1:8000/regioes_perigosas/", data)
        if '2' in str(response.status_code):
            conectado = False
        if conectado is True:
            time.sleep(0.5)

    s.close()
    print(response)

response = requests.get("https://maps.googleapis.com/maps/api/directions/json?origin=-8.0264688,-34.917722&destination=-8.1368627,-34.9115769&alternatives=true")
for rota in response.json()['routes']:
    contagem_lugar_perigoso = 0
    for caminho in rota['legs'][0]['steps']:
        start = caminho['start_location'] # lat e lng
        end = caminho['end_location']
        if lugar_perigoso(regioes_perigosas, start) or lugar_perigoso(regioes_perigosas, start):
            contagem_lugar_perigoso += 1
    import ipdb; ipdb.set_trace()
