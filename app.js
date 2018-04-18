const newRelic = require('newrelic');
const express = require('express');
const server = require('./config/initializers/server');

let app = express();

server.init(app);

module.exports = app;
