var fs = require('fs');
var http = require('http');

exports.downloadData = function(callback) {
    console.log('downloading data...');

    var options = {
        host: 'api.bitcoincharts.com',
        port: 80,
        path: '/v1/markets.json'
    };

    request = http.get(options, function(res) {
        console.log('got data');
        //var wstream = fs.createWriteStream('../bitcoinCharts_new.json');
        res.on('data', function(chunk) {
            fs.appendFile('../bitcoinCharts_new.json', chunk);
        }).on('end', callback);
        //res.pipe(wstream).end(callback());
    });

};

