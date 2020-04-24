const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userAttributesSchema = mongoose.Schema({
    // User Attributes
    userId: { type: ObjectId },
    dateAdded: {
      type: Date,
      required: true
    },
    country: {
      type: String,
      required: false
    },
    postCode: {
      type: Number,
      required: false
    },
    birthMonth: {
      type: Number
    }, 
    birthYear : {
      type: Number
    },
    identifiedGender: {
      type: String
    },
    ppn: {
      type: String
    }, 
    educational: {
      type: String
    },
    materialStatus: {
      type: String
    },
    livingStatus: {
      type: String
    },
    employmentStatus: {
      type: String
    },
    medicalEmployment: {
      type: String
    },
    weight: {
      type: Number,
      min: 0,
      max: 1000,
      unit: "kg",
      required: false
    },
    height: {
      type: Number,
      min: 0,
      max: 1000,
      unit: "cm",
      required: false
    },
    heightUnits: {
      type: String
    },
    weightUnits: {
      type: String
    },
    smoker: {
      type: String
    },
    drinker: {
      type: String
    },
});

const UserAttributes = mongoose.model('UserAttributes', userAttributesSchema);

module.exports = UserAttributes;