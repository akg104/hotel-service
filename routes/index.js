
'use strict';


module.exports = (app) => {
    const router = require('express').Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Hotel-Service' });
    });

    return router;
};
