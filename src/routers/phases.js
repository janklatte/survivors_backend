const express = require('express')
const Phase = require('../models/Phase')
const auth = require('../middleware/auth')

const router = express.Router();

// TODO add APIs to update acute phase and corresponding database

router.put('/phases/me', auth, async (req, res) => {
  // Update a users phase/create if not existance yet
  try {
    const filter = { assigned_to_user: req.user._id };
    let update = req.body;
    if (!req.body.time) {
      update.time = new Date(); // current date time
    }
    else {
      update.time = req.body.time
    }

    let updated_phase = await Phase.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true // create a phase if not existing yet
    });
    res.status(201).send(updated_phase);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get('/phases/me', auth, async(req, res) => {
  // View logged in user profile
  try {
    const filter = { assigned_to_user: req.user._id };
    const phase = await Phase.findOne(filter);
    res.status(201).send(phase);
  }
  catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
})

module.exports = router;