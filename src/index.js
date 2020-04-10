// importing the dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('./db/db')

const userRouter = require('./routers/user')
const phaseRouter = require('./routers/phases')
const surveyRouter = require('./routers/surveys')
const port = process.env.PORT

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// to parse json data
app.use(express.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// adding routers
app.use(userRouter);
app.use(phaseRouter);
app.use(surveyRouter);

// start the server
app.listen(port, async () => {
  console.log(`listening on port ${port}`);
});