const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveySymptomsSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  assigned_to_user: { type: ObjectId },

  // Array of possible symptoms a user can have
  symptoms: [ObjectId], // IDs of Symptoms in Symptom Table
});

// This Schema represents an answered survey/questionnaire by the 
// user. It consists of current symptoms.
const SurveySymptoms = mongoose.model('SurveySymptoms', 
                                      surveySymptomsSchema);
module.exports = SurveySymptoms;