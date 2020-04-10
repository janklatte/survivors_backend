const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  // optional additional information
  description: {
    type: String
  }
});

// This Schema describes questions that user will be asked periodically.
// Storing them in a seperate table instead of hard-coding makes the 
// app more flexibel.
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;