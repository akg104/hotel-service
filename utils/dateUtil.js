/**
 * Created by ashish on 4/15/18.
 */

const moment = require('moment');

/**
 *
 * @param startDate
 * @param endDate
 * @param days {Array}[1-7 (mon - sun)]
 * @returns {Array}
 */
let getDateRange = (startDate, endDate, days) => {
    let date = moment(startDate, 'YYYY-MM-DD');
    let lastDate = moment(endDate, 'YYYY-MM-DD');

    let dateRange = [];

    while(date.isSameOrBefore(lastDate)) {
        if(days.indexOf(date.isoWeekday())>-1) {
            dateRange.push(moment(date));
        }
        date.add(1, 'days');
    }
    return dateRange.map(date => date.format('YYYY-MM-DD'));
};

module.exports = {
    getDateRange
};