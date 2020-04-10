const mongoose = require('mongoose')

const symptomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
});

// This Schema describes possible symptoms that a user can have. Storing
// them in a seperate table instead of hard-coding makes the app
// more flexibel towards viruses in the future.
const Symptom = mongoose.model('Symptom', phaseSchema);
module.exports = Symptom;