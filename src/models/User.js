const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({error: 'Invalid Email address'});
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],

  // Demographic Data
  country: {
    type: String,
    required: false
  },
  zipcode: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    enum: ["m", "f"],
    required: false
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
    required: false
  },
  educational_status: {
    type: String,
    enum: ['Primary', 'Secondary', 'Tertiary', 'Other']
  },
  material_status: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Other']
  },
  living_status: {
    type: String,
    enum: ['Alone', 'Family', 'Shared', 'Other']
  },
  employment_status: {
    type: String,
    enum: ['unemployed', 'retired', 'employed','self-employed', 'other']
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
  // BMI as a boolean? We can just calculate the BMI based on weight and height
  smoking: {
    type: Boolean,
    required: false
  },
  // Chronic Diseases (cd)
  cd_diabetes: {
    type: Number,
    enum: [0, 1, 2], // Corresponds to no diabetis or type 1/2
    required: false
  },
  cd_hypertension: {
    type: Boolean,
    required: false
  },
  cd_copd: {
    type: Boolean,
    required: false
  },
  cd_autoimmune: {
    type: Boolean,
    required: false
  },
  cd_endocrine: {
    type: Boolean,
    required: false
  },
  cd_other: {
    type: String,
    required: false
  },
  // History (h) of ...
  h_cardiovascular: {
    type: String,
    required: false
  },
  h_cancer: {
    type: String,
    required: false
  },
  h_asthma: {
    type: String,
    required: false
  },
  h_sev_allergy: {
    type: String,
    required: false
  },
  h_rheumatic_fever: {
    type: String,
    required: false
  },
  h_depression: {
    type: String,
    required: false
  }
});

userSchema.pre('save', async function(next) {
  // Hash the PW before saving the User model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
})

userSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async (name, password) => {
  // Search for user by name and password
  const user = await User.findOne({ name });
  console.log(user);
  if (!user) {
    throw new Error({ error: 'Invalid login credentials (User)' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch){
    throw new Error({ error: 'Invalid login credentials (PW)' });
  }
  return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
