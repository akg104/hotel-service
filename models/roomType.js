/**
 * Created by ashish on 4/15/18.
 */

/*
 CREATE TABLE IF NOT EXISTS `room_type` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `room_name` varchar(255) NOT NULL,
 `status` tinyint(1) NOT NULL DEFAULT '1',
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
 ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;
 */

'use strict';

module.exports = (sequelize, DataTypes) => {
    var roomType = sequelize.define('roomType', {
        id: DataTypes.INTEGER,
        room_name: DataTypes.STRING,
        status: DataTypes.BOOLEAN,

    }, {
        tableName: 'room_type',
        underscored: true,
        freezeTableName: true,
    });

    roomType.associate = (models) => {
        models.roomType.hasMany(models.roomInventory);
    };

    return roomType;
};
