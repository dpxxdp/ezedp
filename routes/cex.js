'use strict';

var express = require('express');
var router = express.Router();
var CEXIO = require('cexio');

var cexioClient = new CEXIO('btc_usd');


router.get('/book', function(req, res, next) {

    cexioClient.order_book(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/ticker', function(req, res, next) {

    cexioClient.ticker(function(err, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});


module.exports = router;