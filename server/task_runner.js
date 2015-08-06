var btccclient = require('./interfaces/btccclient.js');
var fs = require('fs');

function loopTasks() {
    console.log("looping task");

    btccclient.downloadData(function (error) {
        console.log('downloaded data');
        if (error) {

        }
        var rstream = fs.createReadStream('../bitcoinCharts_new.json');
        var wstream = fs.createWriteStream('../bitcoinCharts.json');
        rstream.pipe(wstream);

        setTimeout(loopTasks, 10000);
    });
};

module.exports.loopTasks = loopTasks();