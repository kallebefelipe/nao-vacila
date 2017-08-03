import requests
import json


response = requests.get("https://maps.googleapis.com/maps/api/directions/json?origin=-8.0264688,-34.917722&destination=-8.1368627,-34.9115769&alternatives=true")

for rota in response.json()['routes']:
    for caminho in rota['legs'][0]['steps']:
        start = caminho['start_location'] # lat e lng
        end = caminho['end_location']
