const express = require('express')
const Question = require('../models/Question')
const Symptom = require('../models/Symptom')
const SurveyQuestions = require('../models/SurveyQuestionsV2')
const SurveySymptoms = require('../models/SurveySymptomsV2')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/questions', async(req, res) => {
  try {
    const questions = await Question.find();
    res.status(201).send(questions);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/symptoms', async(req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(201).send(symptoms);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/survey_questions', auth, async(req, res) => {
  try {
    let survey_body = req.body;
    survey_body.assigned_to_user = req.user._id;
    if (!req.body.dateAdded) {
      survey_body.dateAdded = new Date(); // current date time
    }
    else {
      survey_body.dateAdded = req.body.dateAdded
    }

    const survey = new SurveyQuestions(survey_body);
    await survey.save()

    res.status(201).send(survey);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/survey_symptoms', auth, async(req, res) => {
  try {
    let survey_body = req.body;
    survey_body.assigned_to_user = req.user._id;
    if (!req.body.dateAdded) {
      survey_body.dateAdded = new Date(); // current date time
    }
    else {
      survey_body.dateAdded = req.body.dateAdded
    }

    const survey = new SurveySymptoms(survey_body);
    await survey.save()

    res.status(201).send(survey);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
