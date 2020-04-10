const mongoose = require('mongoose')

const symptomsSchema = mongoose.Schema({
  fever: { type: Boolean },
  cough: { type: Boolean },
  difficulty_breathing: { type: Boolean },
  tiredness: { type: Boolean },
  sore_throat: { type: Boolean },
  runny_nose: { type: Boolean },
  loss_taste: { type: Boolean },
  loss_smell: { type: Boolean }
});

// TODO: This Schema could by optimized by having seperate tables
// of isolation stages, treatments... and then simply linking against
// the corresponding fields. However this will probably make the 
// App/DB too complex for this stage.
const phaseSchema = mongoose.Schema({
  time: { type: Date },
  assigned_to_user: { type: ObjectId },
  diagnosis: {
    type: String,
    enum: ["clinical_only", "swab_antibody_test"]
  },

  // TODO: Clarify how these symptoms differ/correspond to the
  // symptoms of a symptom cluster.
  symptoms: symptomsSchema,
  isolation_stage: {
    type: String,
    enum: [
      "home_care",
      "hospital_admission",
      "icu_admission",
      "icu_intubation",
      "none"
    ]
  },

  // TODO: Clarify if we do multiselect on front end side and simply
  // store any string here (would be simpler and more flexible)
  treatment: {
    type: String,
    enum: [
      "oxygen_therapy",
      "nsaids",
      "paracetamol",
      "antibiotics",
      "antimalarias_drugs",
      "antiviral_drugs",
      "other" 
    ]
  }
});

// A Phase corresponds to a timeperiod of a user with certain
// treatments, symptoms, etc. Each time one of these attributes are
// changed we create a new phase. Querying for all phases of a user
// will then enable us to go through the stages of the recovery process.
// Since the phases are successively we only need to log the beginning
// of a phase ("time" attribute)
const Phase = mongoose.model('Phase', phaseSchema);
module.exports = Phases;
