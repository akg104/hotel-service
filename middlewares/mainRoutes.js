/**
 * Created by ashish on 4/14/18.
 */

"use strict";

module.exports = (app) => {

    let indexRoutes = require('../routes/index.js')(app);

    app.use('/api/v1/hotel-service', indexRoutes);
};
