/**
 * Socket server for thisissoon.fm
 * @author SOON_
 * @name FMSocket
 */

var redis = require("redis"),
    redisClient = redis.createClient(6379, "redis"),
    redisChannel = "fm:player:channel";

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
 * Handle websocket connection
 * @param {Object} socket   socket.io socket
 */
var socketHandler = function socketHandler(socket) {

    // connection confirmation
    console.log("Socket client connected from " + socket.client.conn.remoteAddress);
    socket.emit(redisChannel, { status: "connected" });

    // emit socket message on redis pubsub message event
    redisClient.on("message", function(channel, data) {
        data = JSON.parse(data);

/**
 * Handle redis events
 * @param {String} channel redis channel name
 * @param {Object} data    data passed with redis message
 */
var redisEventHandler = function redisEventHandler(channel, data) {
    data = JSON.parse(data);

    switch (data.event) {
        case "pause":
            io.sockets.emit("fm:player:pause", data);
            break;
        case "resume":
            io.sockets.emit("fm:player:resume", data);
            break;
        case "play":
            io.sockets.emit("fm:player:play", data);
            break;
        case "add":
            io.sockets.emit("fm:player:add", data);
            break;
    }
};

var server = require("http").createServer(serverHandler),
    io = require("socket.io")(server);

// http setup server on port 8080
server.listen(8080);
console.log("Socket server started.");

// handle socket connections
io.on("connection", socketHandler);

// subscribe to redis channel on redis ready event
redisClient.on("ready", function(){
    redisClient.subscribe(redisChannel);
    console.log("Subscribed to redis channel " + redisChannel);
});

// call redisEventHandler on redis message event
redisClient.on("message", redisEventHandler);
