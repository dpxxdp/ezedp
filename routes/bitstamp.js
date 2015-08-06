'use strict';

var express = require('express');
var router = express.Router();
var Bitstamp = require('bitstamp');
var bitstampClient = new Bitstamp;

router.get('/book', function(req, res, next) {

    bitstampClient.order_book(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/ticker', function(req, res, next) {

    bitstampClient.ticker(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});
module.exports = router;
