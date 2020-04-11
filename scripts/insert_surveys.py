import pandas as pd
import numpy as np
import requests
import json
import convert_epidemiological as ce
from datetime import datetime, timedelta

user_file_path = "/home/jan/survivors/scripts/test_users.json"
server_url = "http://localhost:3001/"

#df_phases = pd.read_csv(file_path)

req = requests.get(server_url + "symptoms")
symptoms = req.json()
print(symptoms[10])

req = requests.get(server_url + "questions")
questions = req.json()
print(questions[10])

# Symptoms model:
# Each user reports between 1 to 5 random symptoms every day
def make_symptoms_requests(header, datetime_req):
  nr_symptoms = np.random.randint(1,5, size=1)[0]
  idx_symptoms = np.random.randint(len(symptoms), size=nr_symptoms)
  symptoms_selection = list()

  for idx in idx_symptoms:
    symptoms_selection.append(symptoms[idx]["_id"])
  
  req_body = {
    "symptoms" : symptoms_selection,
    "time": datetime_req
  }
  req = requests.post(server_url + 'survey_symptoms', json=req_body, headers=header)
  print(req.json())

# Questions model:
# Each user answers 3 questions with a random rating periodically (starting from idx=0)
def make_questions_requests(header, datetime_req, question_ptr):
  question_selection = list()
  question_ptr_new = question_ptr
  for idx in range(question_ptr, question_ptr+3+1):
    if idx >= len(questions):
      question_ptr_new = idx - (len(questions)-1)
    else:
      question_ptr_new = idx
    if idx < question_ptr+3:
      question_body = {
        "question": questions[question_ptr_new]["_id"],
        "rating": int(np.random.randint(1,5, size=1)[0])
      }
      question_selection.append(question_body)
    else:
      # simply increase question_ptr_new for next increment
      pass

  req_body = {
    "questions" : question_selection,
    "time": datetime_req
  }
  req = requests.post(server_url + 'survey_questions', json=req_body, headers=header)
  print(req.json())
  return question_ptr_new

# Both Models are executed over a time period of 3 weeks (starting at today-3 weeks)
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
    # token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTkwZjk3NmMzNTcyNzFhNTQzZWY0MWEiLCJpYXQiOjE1ODY2MDY3NjR9.q11qtJpc651QEqQYrzl6V4tJO6MgZhf7gqiaLAiw7DM"
    header = {"Authorization": "Bearer " + token}

    today = datetime.now()
    days_back = 21 # 3 weeks = 7 * 3 days
    day_counter = 0
    question_ptr = 0
    for day in range(days_back):
      day_rev = days_back - day
      new_datetime = today - timedelta(days=day_rev)
      make_symptoms_requests(header, new_datetime.isoformat())

      if (day_counter % 3) == 0:
        question_ptr = make_questions_requests(header, new_datetime.isoformat(), question_ptr)
      day_counter += 1

