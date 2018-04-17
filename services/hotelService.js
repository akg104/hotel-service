/**
 * Created by ashish on 4/15/18.
 */

'use strict';

let models = require('../models');
const dateUtil = require('../utils/dateUtil');
const _ = require('underscore');

/**
 * get rooms config and its inventory
 * @param reqData
 * @returns {*|T}
 */
let getRoomsConfig = (reqData) => {
    return models.roomType.find({
        where: {
            id: reqData.roomCategoryId,
        },
        attributes: ['id', 'room_name', 'status'],
        include: [{
            model: models.roomInventory,
            attributes: ['booking_date', 'room_price', 'available_rooms'],
            where: {
                booking_date: {
                    gte:  reqData.from_date,
                    lte: reqData.to_date,
                }
            }
        }]
    });
};

/**
 * get room inventories based on roomType
 * @param reqData
 * @returns {Promise.<Instance[]>}
 */
let getRoomsInventory = (reqData) => {
    return models.roomInventory.findAll({
        where: {
            booking_date: reqData.bookingDates,
            room_type_id: reqData.roomCategoryId,
        }
    });
};

/**
 * update rooms inventory
 * @param reqData
 * @param roomInventoryIds
 * @returns {Promise.<TResult>}
 */
let updateRoomsInventory = (reqData, roomInventoryIds) => {
    return models.roomInventory.update({
            room_price: reqData.pricePerRoom,
            available_rooms: reqData.availableRooms,
        },
        {
            where: {
                id: roomInventoryIds,
            }
        }
    ).then(res => {
        return res;
    });
};

/**
 * insert room inventories for provided dates
 * @param data
 * @param bookingDates
 * @returns {Promise.<Instance[]>|Promise.<Array.<Instance>>}
 */
let createRoomsInventory = (data, bookingDates) => {
    let dataToInsert = bookingDates.map(bookingDate => {
        return {
            room_type_id: data.roomCategoryId,
            booking_date: bookingDate,
            room_price: data.pricePerRoom,
            available_rooms: data.availableRooms
        }
    });
    return models.roomInventory.bulkCreate(dataToInsert);
};

/**
 * get date range
 * @param startDate
 * @param endDate
 * @param days {Array} [1-monday ... 7-sunday]
 * @returns {Array}
 */
let getDatesRange = (startDate, endDate, days) => {
    return dateUtil.getDateRange(startDate, endDate, days);
};

/**
 * return allDates - existingDates
 * @param existingDates
 * @param allDates
 */
let getDatesToAdd = (existingDates, allDates) => {
    return _.difference(allDates, existingDates);
};

module.exports = {
    getRoomsConfig,
    updateRoomsInventory,
    createRoomsInventory,
    getRoomsInventory,
    getDatesRange,
    getDatesToAdd,
};
