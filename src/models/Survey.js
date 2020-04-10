const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const answeredQuestion = mongoose.Schema({
  question: ObjectId, // ID of Question in Question Table
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4]
  }
});

const surveySchema = mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  assigned_to_user: { type: ObjectId },

  // Array of possible symptoms a user can have
  symptoms: [ObjectId], // IDs of Symptoms in Symptom Table
  questions: [answeredQuestion]
});

// This Schema represents an answered survey/questionnaire by the 
// user. It consists of current symptoms and answered questions 
// towards the current well-being.
const Survey = mongoose.model('Survey', surveySchema);
module.exports = Survey;