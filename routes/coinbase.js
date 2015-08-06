'use strict';

var express = require('express');
var router = express.Router();
var cbe = require('coinbase-exchange');
var cbeClient = new cbe.PublicClient();

router.get('/', function(req, res, next) {
    cbeClient.getProducts(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/book', function(req, res, next) {

    cbeClient.getProductOrderBook(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/book/:detail', function(req, res, next) {

    //console.log(req.params.detail);
    var book_detail = {'level': req.params.detail || 1 };

    cbeClient.getProductOrderBook(book_detail, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/ticker', function(req, res, next) {

    cbeClient.getProductTicker(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

//router.get('/trades', function(req, res, next) {
//
//    cbeClient.getProductTrades(function(err, response, data) {
//        if(err) {
//            console.log(err);
//            res.status(404).json(err);
//        }
//        else { res.json(data); }
//    });
//});

router.get('/historic-rates', function(req, res, next) {

    cbeClient.getProductHistoricRates(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/historic-rates/:granularity', function(req, res, next) {
    var rate_granularity = {'granularity': req.params.granularity || 30 };

    cbeClient.getProductHistoricRates(rate_granularity, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/historic-stats', function(req, res, next) {

    cbeClient.getProduct24HrStats(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/currencies', function(req, res, next) {

    cbeClient.getCurrencies(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

router.get('/time', function(req, res, next) {

    cbeClient.getTime(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });
});

module.exports = router;
