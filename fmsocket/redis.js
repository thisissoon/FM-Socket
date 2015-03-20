"use strict";

var redis = require("redis"),
    url = require("url"),
    logger = require("./logger.js"),
    sockets = require("./sockets.js");

var redisURI = process.env.REDIS_URI || "redis://redis:6379",
    redisChannel = process.env.REDIS_CHANNEL || "fm:events";

var client = redis.createClient(
    url.parse(redisURI).port,
    url.parse(redisURI).hostname
);


module.exports = {

    /**
     * Initialise redis handlers
     * @method init
     */
    init: function(){
        client.on("ready", this.onReady);
        client.on("message", sockets.emitSocketMessage);
    },

    /**
     * Subscribe to redis channel
     * @method onReady
     */
    onReady: function onReady() {
        client.subscribe(redisChannel);
        logger.info("Connected to redis at " + redisURI);
        logger.info("Subscribed to " + redisChannel);
    }

};
