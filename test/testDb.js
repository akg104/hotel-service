/**
 * Created by ashish on 4/17/18.
 */

let SequelizeMock = require('sequelize-mock');
let dbMock = new SequelizeMock();

let roomTypeModel = dbMock.define('room_type', {
    id: 1,
    room_name: 'Single Room',
    status: 1,
    created_at: '2018-04-15 02:00:00',
    updated_at: '2018-04-15 02:00:00'
});

let roomInventoryModel = dbMock.define('room_inventory', {
    id: 1,
    room_type_id: 'Single Room',
    booking_date: '2018-04-16',
    room_price: 1200,
    available_rooms: 5,
    created_at: '2018-04-15 02:00:00',
    updated_at: '2018-04-15 02:00:00'
});

module.exports = {
    roomTypeModel,
    roomInventoryModel,
};
