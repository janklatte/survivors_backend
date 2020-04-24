const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveyQuestionsV2Schema = mongoose.Schema({
  dateAdded: {
    type: Date,
    required: true
  },
  userID: { type: ObjectId },
  D11: {type: Number},
  D12: {type: Number},
  D13: {type: Number},
  D14: {type: Number},
  D15: {type: Number},
  D16: {type: Number},
  D21: {type: Number},
  D22: {type: Number},
  D23: {type: Number},
  D24: {type: Number},
  D25: {type: Number},
  D31: {type: Number},
  D32: {type: Number},
  D33: {type: Number},
  D34: {type: Number},
  D41: {type: Number},
  D42: {type: Number},
  D43: {type: Number},
  D44: {type: Number},
  D45: {type: Number},
  D51: {type: Number},
  D52: {type: Number},
  D53: {type: Number},
  D54: {type: Number},
  D55: {type: Number},
  D56: {type: Number},
  D57: {type: Number},
  D58: {type: Number},
  D61: {type: Number},
  D62: {type: Number},
  D63: {type: Number},
  D64: {type: Number},
  D65: {type: Number},
  D66: {type: Number},
  D67: {type: Number},
  D68: {type: Number},
  H1: {type: Number},
  H2: {type: Number}, 
  H3: {type: Number}
});

// This Schema represents an answered questionnaire by the 
// user. It consists of answered questions towards the current 
// well-being.
const SurveyQuestionsV2 = mongoose.model('SurveyQuestionsV2', 
                                        surveyQuestionsV2Schema);
module.exports = SurveyQuestionsV2;