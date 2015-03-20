"use strict";

var io, socketURL, options, client;

var sockets = require("../fmsocket/sockets.js");

before(function(){

    io = require("socket.io-client");

    socketURL = "http://socket:8080";

    options = {
        transports: ["websocket"],
        "force new connection": true
    };

    client = io.connect(socketURL, options);

});

describe("socket: on connect", function (){

    it("should emit connection confirmaton", function (done){
        client.on("fm:player:status", function (data){
            expect(data.status).to.equal("connected");
            client.disconnect();
            done();
        });
    });

});
