import json
import requests
import time

with open('carga_inicial.json') as json_data:
    dados = json.load(json_data)
    for count, each in enumerate(dados):
        print(count)
        each['hora'] = each['hora'][11:19]
        if each['tipo_assalto_id'] == 2:
            each['id_tipo'] = '1'
        if each['tipo_assalto_id'] == 1:
            each['id_tipo'] = '2'
        if each['tipo_assalto_id'] == 9:
            each['id_tipo'] = '2'
        if each['tipo_assalto_id'] == 3:
            each['id_tipo'] = '2'
        if each['tipo_assalto_id'] == 4:
            each['id_tipo'] = '3'
        if each['tipo_assalto_id'] == 5:
            each['id_tipo'] = '4'
        if each['tipo_assalto_id'] == 6:
            each['id_tipo'] = '4'
        if each['tipo_assalto_id'] == 7:
            each['id_tipo'] = '4'
        if each['tipo_assalto_id'] == 11:
            each['id_tipo'] = '5'
        conectado = True
        while conectado:
            # response = requests.post("http://webserver-nao-vacila.herokuapp.com/ocorrencia/", data=each)
            response = requests.post("http://127.0.0.1:8000/ocorrencia/", data=each)
            if '2' in str(response.status_code):
                conectado = False
            if conectado is True:
                time.sleep(2)

# 1 assalto
# 2 roubo
# 3 sequestro
# 4 arrombamento
# 5 tiroteio
