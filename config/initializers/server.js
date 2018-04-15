/**
 * Created by ashish on 4/14/18.
 */

'use strict';

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorHandler = require('../../middlewares/errorHandler');
const logger = require('./logger').getBasicLogger('server');
const routeMiddleware = require('../../middlewares/mainRoutes');
const initializeDb = require('./database');

module.exports.initLocalVariables = (app) => {
    dotenv.config();
    // view engine setup
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'pug');
};

module.exports.initMiddleware = (app) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use((req, res, next) => {
       logger.info(`url: ${req.url}`);
       next();
    });
    // health check
    app.get('/health', (req, res) => {
       res.sendStatus(200);
    });
};

module.exports.initHelmetHeaders = (app) => {
    app.use(helmet());
};

module.exports.initModulesServerRoutes = (app) => {
    routeMiddleware(app);
};

module.exports.initErrorHandlers = (app) => {
    app.use(errorHandler.createErrorHandler);
    app.use(errorHandler.catchAllErrorHandler);
};

module.exports.init = (app) => {

    // Initialize local variables
    this.initLocalVariables(app);

    // Initialize Express middleware
    this.initMiddleware(app);

    // Initialize Helmet security headers
    this.initHelmetHeaders(app);

    // Initialize modules server routes
    this.initModulesServerRoutes(app);

    // Init error handlers
    this.initErrorHandlers(app);

    return app;
};
