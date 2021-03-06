/**
 * Created by ashish on 4/14/18.
 */

'use strict';

const createError = require('http-errors');

module.exports.createErrorHandler = (err, req, res, next) => {
    // next(createError(404));
    next();
};

module.exports.catchAllErrorHandler = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};
