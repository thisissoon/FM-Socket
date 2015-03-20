"use strict";
/**
 * Socket server for thisissoon.fm
 * @author SOON_
 * @name FMSocket
 */

var server = require("./server.js"),
    redis = require("./redis.js");

// Start Server
global.server = server.start();

// Initialise Redis
redis.init();
