const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const answeredQuestion = mongoose.Schema({
  question: ObjectId, // ID of Question in Question Table
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4]
  }
});

const surveyQuestionsSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  assigned_to_user: { type: ObjectId },
  questions: [answeredQuestion]
});

// This Schema represents an answered questionnaire by the 
// user. It consists of answered questions towards the current 
// well-being.
const SurveyQuestions = mongoose.model('SurveyQuestions', 
                                        surveyQuestionsSchema);
module.exports = SurveyQuestions;