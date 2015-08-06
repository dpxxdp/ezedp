'use strict';

var express = require('express');
var router = express.Router();
var cbe = require('coinbase-exchange');
var auth = require('../server/auth.js');
var settings = require('../settings.js');


var cbeAuthClient = new cbe.AuthenticatedClient(
    auth.key, auth.secret, auth.passphrase);

router.get('/', function(req, res, next) {

    cbeAuthClient.getAccounts(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});


router.get('/:id', function(req, res, next) {

    cbeAuthClient.getAccount(req.params.id, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});


router.get('/:id/history', function(req, res, next) {

    cbeAuthClient.getAccountHistory(req.params.id, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.get('/:id/holds', function(req, res, next) {

    cbeAuthClient.getAccountHolds(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.get('/:id/holds/:pages', function(req, res, next) {

    var holds_pages = {'level': req.params.pages || 3000 };

    cbeAuthClient.getAccountHolds(holds_pages, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});


router.post('/buy', function(req, res, next) {
    console.log('body: ' + req.body);
    var buy_params = req.body.buyParams;

    if(buy_params.product_id != 'BTC-USD') {
        res.status('404').json({'message':'Unsupported product'});
    }
    else if (buy_params.size > settings.BTC_USD.MAX_BUY){
        res.status('404').json({'message':'Buy limit set at: ' + settings.BTC_USD.MAX_BUY});
    }
    else if (buy_params.price > settings.USD_BTC.MAX_BUY) {
        res.status('404').json({'message':'Ask limit set at: ' + settings.USD_BTC.MAX_BUY});
    }
    else {
        cbeAuthClient.buy(buy_params, function(err, response, data) {
            if(err) {
                console.log(err);
                res.status(404).json(err);
            }
            else { res.json(data); }
        });
    }

});

router.post('/sell', function(req, res, next) {
    var sell_params = req.body.sellParams;

    if(sell_params.product_id != 'BTC-USD') {
        res.status('404').json({'message':'Unsupported product'});
    }
    else if (sell_params.size > settings.BTC_USD.MAX_SELL){
        res.status('404').json({'message':'Buy limit set at: ' + settings.BTC_USD.MAX_SELL});
    }
    else if (sell_params.price > settings.USD_BTC.MAX_SELL) {
        res.status('404').json({'message':'Ask limit set at: ' + settings.USD_BTC.MAX_SELL});
    }
    else {
        cbeAuthClient.sell(sell_params, function(err, response, data) {
            if(err) {
                console.log(err);
                res.status(404).json(err);
            }
            else { res.json(data); }
        });
    }

});

router.get('/orders', function(req, res, next) {

    cbeAuthClient.getOrders(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.get('/orders/:pages', function(req, res, next) {

    cbeAuthClient.getOrders(req.params.pages, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.get('/order/:id', function(req, res, next) {

    cbeAuthClient.getOrder(req.params.id, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.put('/order/:orderId/cancel', function(req, res, next) {

    cbeAuthClient.cancelOrder(req.params.orderId, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.get('/fills', function(req, res, next) {

    cbeAuthClient.getFills(function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});

router.get('/fills/:pages', function(req, res, next) {

    cbeAuthClient.getFills(req.params.pages, function(err, response, data) {
        if(err) {
            console.log(err);
            res.status(404).json(err);
        }
        else { res.json(data); }
    });

});


module.exports = router;