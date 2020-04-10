const express = require('express')
const Question = require('../models/Question')
const Symptom = require('../models/Symptom')
const Survey = require('../models/Survey')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/questions', async(req, res) => {
  // View logged in user profile
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
  // View logged in user profile
  try {
    const symptoms = await Symptom.find();
    res.status(201).send(symptoms);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/survey', auth, async(req, res) => {
  // View logged in user profile
  try {
    let survey_body = req.body;
    survey_body.assigned_to_user = req.user._id;
    survey_body.time = new Date();

    const survey = new Survey(survey_body);
    await survey.save()

    res.status(201).send(survey);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
