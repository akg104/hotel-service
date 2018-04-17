/**
 * Created by ashish on 4/16/18.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const hotelService = require('../services/hotelService');
const testDb = require('./testDb');

describe('#getDatesRange()', () => {
    it('should get date range', () => {
        let a = '2018-03-29';
        let b = '2018-04-05';
        let c = [1,3,4,7];
        let d = ['2018-03-29', '2018-04-01', '2018-04-02', '2018-04-05', '2018-04-04'];

        let result = hotelService.getDatesRange(a,b,c);

        expect(result).to.have.members(d);
    });
});

describe('#getRoomsConfig()', () => {
    it('should get room and its inventories', (done) => {
        let reqData = {
            roomCategoryId: 1,
            from_date: '2018-04-15',
            to_date: '2018-04-20'
        };
        let expected = [];

        hotelService.getRoomsConfig(reqData)
        .then(resp => {
            expect(resp).to.be.eq(expected);
            done();
        }).catch(done);
    });
});

describe('#getDatesToAdd()', () => {
    it('should get dateRangeB - dateRangeA', () => {
        let existing = ['2018-04-12', '2018-04-13'];
        let all = ['2018-04-12', '2018-04-13', '2018-04-14', '2018-04-15'];
        let result = hotelService.getDatesToAdd(existing, all);
        expect(result).to.have.members(['2018-04-14', '2018-04-15']);
    })
});

describe('#getRoomsInventory()', () => {
    it('should return rooms inventory', (done) => {
        let reqData = {
            bookingDates: ['2018-04-15', '2018-04-16', '2018-04-18'],
            roomCategoryId: 1
        };
        hotelService.getRoomsInventory(reqData)
        .then(resp => {
            expect(resp).to.have.any.keys('c');
            done();
        }).catch(done);
    });
});