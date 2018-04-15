
'use strict';

module.exports = (app) => {
    const router = require('express').Router();
    const hotelController = require('../controllers/hotelController');

    /* GET home page. */
    router.get('/', (req, res, next) => {
        res.render('index', { title: 'Hotel-Service' });
    });

    router.post('/rooms/config', (req, res, next) => {
        return hotelController.updateRoomsConfig(req, res, next);
    });

    router.get('/rooms/:roomCategoryId', (req, res, next) => {
        return hotelController.getRoomsConfig(req, res, next);
    });

    return router;
};
