/**
 * Created by ashish on 4/15/18.
 */

'use strict';

const hotelService = require('../services/hotelService');
const dateUtil = require('../utils/dateUtil');
const _ = require('underscore');
const logger = require('../config/initializers/logger').getBasicLogger('hotelController');
const Joi = require('joi');
const hotelObjects = require('../objectSchemas/hotelObjects');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

/**
 * fetch Rooms config and its inventory
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>}
 */
let getRoomsConfig = (req, res, next) => {
    return Joi.validate(req.params, hotelObjects.getRoomsConfigParamsSchema)
    .then(validData => {
        return Joi.validate(req.query, hotelObjects.getRoomsConfigQuerySchema);
    })
    .then(validData => {
        logger.info('[getRoomsConfig] fetching room and its inventory');
        return hotelService.getRoomsConfig(Object.assign(req.params, req.query));
    })
    .then(resp => res.json(resp))
    .catch(err => res.json(err));
};

/**
 * Update Rooms price/availablity on given dates
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<TResult>}
 */
let updateRoomsConfig = (req, res, next) => {
    let data = req.body;
    let dateRange = [];

    return Joi.validate(data, hotelObjects.updateRoomsConfigBodySchema)
    .then(validData => {
        dateRange = hotelService.getDatesRange(data.fromDate, data.toDate, data.days);
        logger.info('[updateRoomsConfig] fetching existing date to update');
        return hotelService.getRoomsInventory({
            roomCategoryId: data.roomCategoryId,
            bookingDates: dateRange,
        });
    })
    .then(roomInvData => {
        let roomInvDtos = roomInvData.map(obj => obj.get());
        let roomInvIds = roomInvData.map(obj => obj.id);
        let roomInvDates = roomInvDtos.map(obj => obj.booking_date);
        let datesToAdd = hotelService.getDatesToAdd(roomInvDates, dateRange);

        logger.info('[updateRoomsConfig] updating and inserting inventory data');
        return Promise.all([
            updateRoomsInventory(data, roomInvIds),
            createRoomsInventory(data, datesToAdd),
        ])
    })
    .then(savedData => {
        logger.info(`updated records : ${savedData[0].length}, inserted records : ${savedData[1].length}`);
        res.json({});
    })
    .catch(err => res.json(err));
};

/**
 * acquire lock before updating room inventory
 * @param data
 * @param roomInventoryIds
 * @returns {*|Bluebird.Promise|Promise.<TResult>}
 */
let updateRoomsInventory = (data, roomInventoryIds) => {
    let keys = roomInventoryIds.map(id => `hotelservice:invId:${id}`);
    return lock.acquire(keys, () => {
        return hotelService.updateRoomsInventory(data, roomInventoryIds);
    }).then((res) => {
        return res;
    });
};

/**
 * acquire lock before inserting data
 * @param data
 * @param datesToAdd
 * @returns {*|Bluebird.Promise|Promise.<TResult>}
 */
let createRoomsInventory = (data, datesToAdd) => {
    let keys = datesToAdd.map(date => `hotelService:room:${data.roomCategoryId}:${date}`);
    return lock.acquire('keys', () => {
        return hotelService.createRoomsInventory(data, datesToAdd);
    }).then((res) => {
        return res;
    });
};

module.exports = {
    getRoomsConfig,
    updateRoomsConfig,
};
