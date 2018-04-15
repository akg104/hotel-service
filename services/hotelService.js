/**
 * Created by ashish on 4/15/18.
 */

'use strict';

let models = require('../models');
const dateUtil = require('../utils/dateUtil');
const _ = require('underscore');


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

let getRoomsInventory = (reqData) => {
    return models.roomInventory.findAll({
        where: {
            booking_date: reqData.bookingDates,
            room_type_id: reqData.roomCategoryId,
        }
    });
};

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

let getDatesRange = (startDate, endDate, days) => {
    return dateUtil.getDateRange(startDate, endDate, days);
};

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
