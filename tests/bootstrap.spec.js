"use strict";

var chai = require("chai");

global.expect = chai.expect;
global.sinon = require("sinon");

var server = require("../fmsocket/server.js");

global.server = server.start();
