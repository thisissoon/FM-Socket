"use strict";

var changeCase = require("change-case"),
    logger = require("./logger.js");

/**
 * Socket message handling
 * @module sockets
 */
module.exports = {

    /**
     * Emit socket message with camel case name and attach data
     * @param {String} channel redis channel name
     * @param {Object} data    data passed with redis message
     *                         @method emitSocketMessage
     */
    emitSocketMessage: function emitSocketMessage(channel, data) {

//        data = JSON.parse(data);

        // camelCase event names and prefix with "fm:player:"
        var redisEventName = changeCase.camelCase(data.event),
            socketEventName = "fm:player:" + redisEventName;

        logger.verbose("emmiting " + socketEventName + " event");
        global.server.io.sockets.emit(socketEventName, data);

    },

    /**
     * Log socket connection and emit status event to connected socket
     * @param {Object} socket   socket.io socket
     * @method emitSocketConnect
     */
    emitSocketConnect: function emitSocketConnect(socket) {

        logger.info("Socket client connected from " + socket.client.conn.remoteAddress);
        socket.emit("fm:player:status", { status: "connected" });

    }

};
