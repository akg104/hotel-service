/**
 * Created by ashish on 4/14/18.
 */

'use strict';

const models = require('../../models');
const logger = require('./logger').getBasicLogger('database');

// initialize db
(() => {
    models.sequelize.sync().then(() => {
        logger.info('connected to database');
    }).catch((err) => {
        logger.error(`connection to database failed : ${err}`);
    });
})();
