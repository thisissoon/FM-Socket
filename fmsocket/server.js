"use strict";

var http = require("http"),
    fs = require("fs"),
    socketIO = require("socket.io"),
    logger = require("./logger.js"),
    sockets = require("./sockets.js");

var socketPort = process.env.SOCKET_PORT || "8080";

/**
 * Serve client example
 * @param   {Object}   req http request
 * @param   {Object}   res http response
 */
var httpHandler = function httpHandler(req, res) {
    fs.readFile(__dirname + "/public/index.html",
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end("Error loading index.html");
            }

            res.writeHead(200);
            res.end(data);
        }
    );
};

/**
 * @module server
 */
module.exports = {

    /**
     * Start express server and attach socker.io server
     * @param {Object} env Environment configuration
     */
    start: function(){

        var server = http.createServer(httpHandler);
        server.io = socketIO(server);
        server.listen(socketPort);
        logger.info("Socket server started on " + socketPort);

        server.io.on("connection", sockets.emitSocketConnect);

        return server;
    }

};
