"use strict";

var sockets = require("../../fmsocket/sockets.js"),
    logger = require("../../fmsocket/logger.js");

var socketServer, mockLogger;

describe("sockets", function (){

    beforeEach(function(){
        global.server = {
            io: {
                sockets: {
                    emit: function(){}
                }
            }
        };

        socketServer = sinon.stub(global.server.io.sockets, "emit" , function(){});
        mockLogger = {
            verbose: sinon.stub(logger, "verbose", function(){}),
            info: sinon.stub(logger, "info", function(){})
        };
    });

    afterEach(function(){
        logger.verbose.restore();
        logger.info.restore();
    });

    describe("emitSocketMessage", function (){

        it("should emit global socket message", function(){
            var eventData = JSON.stringify({
                event: "play",
                uri: "spotify:track"
            });

            sockets.emitSocketMessage("fm:events", eventData);

            expect(socketServer.called).to.be.true;
            expect(mockLogger.verbose.called).to.be.true;

        });

    });

    describe("emitSocketConnect", function (){

        it("should emit socket connection confirmation", function(){
            var mockSocket = {
                emit: sinon.spy(),
                client: {
                    conn: {
                        remoteAddress: "127.0.0.1"
                    }
                }
            };

            sockets.emitSocketConnect(mockSocket);

            expect(mockSocket.emit).to.have.been.calledWith("fm:player:status", { status: "connected" });
            expect(mockLogger.info).to.have.been.calledWith("Socket client connected from 127.0.0.1");
        });

    });

});
