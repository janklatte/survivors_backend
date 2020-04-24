const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  username: {
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
  name: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  createDate: {
    type: Date,
    required: false
  },
  updatedDate: {
    type: Date,
    required: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  geneticGender: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: Date,
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

userSchema.statics.findByCredentials = async (username, password) => {
  // Search for user by username and password
  const user = await User.findOne({ username });
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
