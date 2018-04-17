/**
 * Created by ashish on 4/18/18.
 */

"use strict";

const Joi = require('joi');

module.exports = {
    getRoomsConfigParamsSchema : Joi.object().keys({
        roomCategoryId: Joi.number().min(1).required()
    }),
    getRoomsConfigQuerySchema : Joi.object().keys({
        from_date: Joi.date().required(),
        to_date: Joi.date().min(Joi.ref('from_date')).required()
    }),
    updateRoomsConfigBodySchema : Joi.object().keys({
        roomCategoryId: Joi.number().min(0).required(),
        fromDate: Joi.date().required(),
        toDate: Joi.date().min(Joi.ref('fromDate')).required(),
        days: Joi.array().min(1).max(7).unique().items(1,2,3,4,5,6,7).required(),   // 1-mon ... 7-sun
        pricePerRoom: Joi.number().min(1).required(),
        availableRooms: Joi.number().min(0).max(5).required()
    })
};
