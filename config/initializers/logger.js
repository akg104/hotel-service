/**
 * Created by ashish on 4/14/18.
 */

'use strict';

const bunyan = require('bunyan');

module.exports.getBasicLogger = (name = 'init') => {
    return bunyan.createLogger({name});
};
