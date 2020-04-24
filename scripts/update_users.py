import pandas as pd
import numpy as np
import requests
import json
import convert_epidemiological as ce

file_path = "~/Downloads/survivors_test_data/countryDateMap.csv"
user_file_path = "/home/jan/survivors/server/scripts/test_users.json"
server_url = "https://hackcorona-survivors-server.herokuapp.com/"

df_phases = pd.read_csv(file_path)

idx = 0
with open(user_file_path) as f:
  for line in f:
    user_json = json.loads(line)
    print(user_json['name'])
    login_body = {
      "name" : user_json['name'],
      "password": "123456"
    }
    print(json.dumps(login_body))
    req = requests.post(server_url + 'users/login', json=login_body)
    res = req.json()
    token = res['token']
    header = {"Authorization": "Bearer " + token}

    country_options = ["Belgium", "Germany", "Greece", "India", "Italy"]
    country_idx = np.random.randint(len(country_options), size=1)[0]

    update_body = {
      "country": country_options[country_idx]
    }

    req = requests.put(server_url + "users/me", headers=header, json = update_body)
    print(req.json())
