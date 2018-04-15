/**
 * Created by ashish on 4/15/18.
 */

/*
 CREATE TABLE IF NOT EXISTS `room_inventory` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `room_type_id` int(11) NOT NULL,
 `booking_date` date NOT NULL,
 `room_price` int(11) NOT NULL,
 `available_rooms` int(11) NOT NULL DEFAULT '0',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `room_type_id` (`room_type_id`)
 ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

 ALTER TABLE `room_inventory`
 ADD CONSTRAINT `room_inventory_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`);

 */

'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    var roomInventory = sequelize.define('roomInventory', {
        id: DataTypes.BIGINT,
        room_type_id: DataTypes.INTEGER,
        booking_date: {
            type: DataTypes.DATE,
            get : function() {
                return moment.utc(this.getDataValue('booking_date')).format('YYYY-MM-DD');
            }
        },
        room_price: DataTypes.INTEGER,
        available_rooms: DataTypes.INTEGER,
    }, {
        tableName: 'room_inventory',
        underscored: true,
        freezeTableName: true,
    });

    roomInventory.associate = (models) => {
        models.roomInventory.belongsTo(models.roomType);
    };

    return roomInventory;
};
