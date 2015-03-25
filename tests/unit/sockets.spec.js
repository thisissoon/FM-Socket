"use strict";

var sockets = require("../../fmsocket/sockets.js"),
    logger = require("../../fmsocket/logger.js");

var socketServer;

describe("sockets", function (){

    beforeEach(function(){
        socketServer = sinon.stub(global.server.io.sockets, "emit" , function(){});
        logger = sinon.stub(logger, "verbose", function(){});
    });

    describe("emitSocketMessage", function (){

        it("should emit global socket message", function(){
            var eventData = JSON.stringify({
                event: "play",
                uri: "spotify:track"
            });

            sockets.emitSocketMessage("fm:events", eventData);

            expect(socketServer.called).to.be.true;
            expect(logger.called).to.be.true;

        });

    });

});
