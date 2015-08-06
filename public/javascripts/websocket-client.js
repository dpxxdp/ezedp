'use strict';

var express = require('express');
var router = express.Router();
var cbe = require('coinbase-exchange');
var cbeWebSocketClient = new cbe.WebsocketClient();

cbeWebSocketClient.on('message', function(data) {
    console.log();
});




module.exports = app;