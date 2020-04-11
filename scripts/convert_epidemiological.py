import pandas as pd
import numpy as np
import names
import requests
import json

def parse_n_y(y_n_str):
  return "true" if y_n_str == 'Y' else "false"

def parse_diabetis(str_):
  return 0 if str_ == 'N' else int(np.random.randint(1,2, size=1)[0]) 

def parse_material(str_):
  return str_ if str_ != 'Widow' else "Widowed"

def parser_user(df_user):
  print(df_user['gender'])
  gender_str = 'male' if df_user['gender'] == 'M' else 'female'
  user_id = names.get_first_name(gender_str) + str(np.random.randint(999, size=1)[0])
  password = "123456"


  req_body = {
    "name": user_id,
    "password": password,
    "gender": df_user['gender'].lower(),
    "age": int(df_user['age']),
    "height": int(df_user['height']),
    "weight": int(df_user['weight']),
    "educational_status": df_user['eduLevel'],
    "material_status": parse_material(df_user['maritalStatus']),
    "living_status": df_user['livingArr'],
    "employment_status": df_user['employment'],
    "cd_diabetes": parse_diabetis(parse_n_y(df_user['cd_diabetes'])),
    "cd_hypertension": parse_n_y(df_user['cd_hypertension']),
    "cd_copd": parse_n_y(df_user['cd_copd']),
    "cd_autoimmune": parse_n_y(df_user['cd_autoimmune']),
    "cd_endocrine": parse_n_y(df_user['cd_endocrine']),
    "cd_other": parse_n_y(df_user['cd_other']),
    "h_cardiovascular": parse_n_y(df_user['h_cardiovascular']),
    "h_cancer": parse_n_y(df_user['h_cancer']),
    "h_asthma": parse_n_y(df_user['h_asthma']),
    "h_sev_allergy": parse_n_y(df_user['h_sev_allergy']),
    "h_rheumatic_fever": parse_n_y(df_user['h_rheumatic_fever']),
    "h_depression": parse_n_y(df_user['h_depression'])
  }
  print(json.dumps(req_body))
  r = requests.post(server_url + 'users', json=req_body)
  print(r.json())

if __name__ == "__main__":  
  file_path = "~/survivors-viz/data/epidemiological.csv"
  server_url = "http://localhost:3001/"
  #server_url = "https://hackcorona-survivors-server.herokuapp.com/"

  df = pd.read_csv(file_path)
  
  for i in range(0, df.shape[0]):
    parser_user(df.iloc[i])

#print(df)