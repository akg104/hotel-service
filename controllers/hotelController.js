/**
 * Created by ashish on 4/15/18.
 */

'use strict';

const hotelService = require('../services/hotelService');
const dateUtil = require('../utils/dateUtil');
const _ = require('underscore');
const logger = require('../config/initializers/logger').getBasicLogger('hotelController');

let getRoomsConfig = (req, res, next) => {
    return hotelService.getRoomsConfig(Object.assign(req.params, req.query))
    .then(resp => res.json(resp))
    .catch(err => res.json(err));
};

let updateRoomsConfig = (req, res, next) => {
    let data = req.body;
    let dateRange = hotelService.getDatesRange(data.fromDate, data.toDate, data.days);
    return hotelService.getRoomsInventory({
        roomCategoryId: data.roomCategoryId,
        bookingDates: dateRange,
    })
    .then(roomInvData => {
        let roomInvDtos = roomInvData.map(obj => obj.get());
        let roomInvIds = roomInvData.map(obj => obj.id);
        let roomInvDates = roomInvDtos.map(obj => obj.booking_date);
        let datesToAdd = hotelService.getDatesToAdd(roomInvDates, dateRange);

        return Promise.all([
            hotelService.updateRoomsInventory(data, roomInvIds),
            hotelService.createRoomsInventory(data, datesToAdd),
        ])
    })
    .then(savedData => {
        logger.info(`updated records : ${savedData[0].length}, inserted records : ${savedData[1].length}`);
        res.json({});
    });
};

module.exports = {
    getRoomsConfig,
    updateRoomsConfig,
};
