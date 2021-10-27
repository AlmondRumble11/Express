//get moment. used with date and time
const moment = require("moment");

//logger--> middleware functtion. This funti0on happens everytime a request is made
const logger = (request, response, next) => {
    console.log("MIDDLEWARE FUNCTION");
    console.log(`${request.protocol}://${request.get('host')}${request.originalUrl}: ${moment().format()}`);
    next();
};

//export to app.js
module.exports = logger;