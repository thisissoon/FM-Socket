/**
 * Socket server for thisissoon.fm
 * @author SOON_
 * @name FMSocket
 */

var redis = require("redis"),
    redisClient = redis.createClient(6379, "redis"),
    redisChannel = "fm:player:channel",
    logger = require("winston");

var fs = require("fs");

/**
 * Serve example socket client
 * @param   {Object}   req node request object
 * @param   {Object}   res node response object
 * @method serverHandler
 */
var serverHandler = function serverHandler (req, res) {
    fs.readFile(__dirname + "/client-example.html",
                function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end("Error loading client-example.html");
        }

        res.writeHead(200);
        res.end(data);
    });
}

/**
 * Log socket connection and emit status event to connected socket
 * @param {Object} socket   socket.io socket
 * @method sockerConnectHandler
 */
var socketConnectHandler = function socketConnectHandler(socket) {

    logger.info("Socket client connected from " + socket.client.conn.remoteAddress);
    socket.emit("fm:player:status", { status: "connected" });

};

/**
 * Handle redis events
 * @param {String} channel redis channel name
 * @param {Object} data    data passed with redis message
 */
var redisEventHandler = function redisEventHandler(channel, data) {
    data = JSON.parse(data);

    switch (data.event) {
        case "pause":
            logger.verbose("emmiting pause event");
            io.sockets.emit("fm:player:pause", data);
            break;
        case "resume":
            logger.verbose("emmiting resume event");
            io.sockets.emit("fm:player:resume", data);
            break;
        case "play":
            logger.verbose("emmiting play event");
            io.sockets.emit("fm:player:play", data);
            break;
        case "add":
            logger.verbose("emmiting add event");
            io.sockets.emit("fm:player:add", data);
            break;
        default:
            logger.warn("unrecognised redis event");
    }
};

// configure http and socket server on port 8080
var server = require("http").createServer(serverHandler),
    io = require("socket.io")(server);

server.listen(8080);
logger.info("Socket server started.");

// call socketConnectHandler on socket connection event
io.on("connection", socketConnectHandler);

// subscribe to redis channel on redis ready event
redisClient.on("ready", function(){
    redisClient.subscribe(redisChannel);
    logger.info("Subscribed to redis channel " + redisChannel);
});

// call redisEventHandler on redis message event
redisClient.on("message", redisEventHandler);
