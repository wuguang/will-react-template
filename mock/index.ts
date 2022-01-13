const express = require('express');
const app = express();
const config = require('../config');
const port = config.mockPort;
const killPort = require('kill-port');
const bodyParser = require('body-parser');
const apiObj = require('./api/index');

app.use(bodyParse.urlencode({extend:false}));