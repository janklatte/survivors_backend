const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const surveySymptomsV2Schema = mongoose.Schema({
  dateAdded: {
    type: Date,
    required: true
  },
  userId: { type: ObjectId },

  cough: {type: Number},
  breathDifficulties: {type: Number},
  breathAtNight: {type: Number},
  breathAtRest: {type: Number},
  breathExercise: {type: Number},
  fever: {type: Number},
  other: {type: String},
  runnyNose: {type: Number},
  soreThroat: {type: Number},
  bloodInStool: {type: Number},
  constipation: {type: Number},
  looseStool: {type: Number},
  vomitting: {type: Number},
  temperature: {type: Number},
  temperatureUnits: {type: Number},
  dizziness: {type: Number},
  hearingLoss: {type: Number},
  lossSmell: {type: Number},
  lossTaste: {type: Number},
  visualLoss: {type: Number},
  bpSys: {type: Number},
  bpDia: {type: Number},
  chestPain: {type: Number}

});

// This Schema represents an answered survey/questionnaire by the 
// user.
const SurveySymptomsV2 = mongoose.model('SurveySymptomsV2', 
                                      surveySymptomsV2Schema);
module.exports = SurveySymptomsV2;
