const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/users/me', auth, async(req, res) => {
  // View logged in user profile
  res.send(req.user)
})

router.post('/users', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put('/users/me', auth, async (req, res) => {
  // Update a user profile
  try {
    await req.user.update({$set: req.body});
    const updated_user = await User.findOne({
      _id: req.user._id
    });
    req.user = updated_user;
    res.status(201).send(req.user);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/users/login', async(req, res) => {
  // Login a registered User
  try {
    const { name, password } = req.body;
    const user = await User.findByCredentials(name, password);
    if (!user) {
      return res.status(401).send({error: 'Login failed!'});
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch(error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/users/me/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

module.exports = router