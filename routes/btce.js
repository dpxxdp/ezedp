'use strict';

var express = require('express');
var router = express.Router();
var BTCE = require('btc-e');
var btceClient = new BTCE();

router.get('/ticker', function(req, res, next) {

    btceClient.ticker('btc_usd', function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/ticker/:symbol', function(req, res, next) {

    btceClient.ticker(req.params.symbol, function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});


module.exports = router;
