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
    socket.emit(redisChannel, { status: "connected" });

    redisClient.on("message", function(channel, data) {
        data = JSON.parse(data);

        switch (data.event) {
            case "pause":
                socket.emit("fm:player:pause", data);
            case "play":
                socket.emit("fm:player:play", data);
        }

    });
};

var server = require("http").createServer(serverHandler),
    io = require("socket.io")(server);

server.listen(8080);

io.on("connection", socketHandler);

redisClient.on("ready", function(){
    redisClient.subscribe(redisChannel);
});
