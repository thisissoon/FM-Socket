"use strict";

var winston = require("winston"),
    logLevel = process.env.SOCKET_LOG_LEVEL || "info";

/**
 * Instance of winston logger
 * @module logger
 * @returns winston.Logger instance
 */
module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: logLevel }),
    ]
});
