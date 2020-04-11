import pandas as pd
import numpy as np
import requests
import json
import convert_epidemiological as ce

file_path = "~/survivors-viz/data/acutePhase.csv"
user_file_path = "/home/jan/survivors/scripts/test_users.json"
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

    df_phase = df_phases.iloc[idx]
    phase_body = {
      "diagnosis": df_phase["diagnosis"],
      "symptoms": {
        "fever": ce.parse_n_y(df_phase["fever"]),
        "cough": ce.parse_n_y(df_phase["cough"]),
        "difficulty_breathing": ce.parse_n_y(df_phase["difficulty_breathing"]),
        "tiredness": ce.parse_n_y(df_phase["tiredness"]),
        "sore_throat": ce.parse_n_y(df_phase["sore_throat"]),
        "runny_nose": ce.parse_n_y(df_phase["runny_nose"]),
        "loss_taste": ce.parse_n_y(df_phase["loss_taste"]),
        "loss_smell": ce.parse_n_y(df_phase["loss_smell"])
      },
      "isolation_stage": df_phase["isolation_stage"],
      "treatment": df_phase["treatment"]
    }

    req = requests.put(server_url + "phases/me", headers=header, json = phase_body)
    print(req.json())
    idx += 1
