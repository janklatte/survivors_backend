const express = require('express')
const Phases = require('../models/Phase')
const auth = require('../middleware/auth')

const router = express.Router();

// TODO add APIs to update acute phase and corresponding database