'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req, res, next) {
    var rstream = fs.createReadStream('../bitcoinCharts.json');
    rstream.pipe(res);
});

module.exports = router;
