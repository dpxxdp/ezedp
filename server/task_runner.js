var btccclient = require('./interfaces/btccclient.js');
var fs = require('fs');

exports.loopTasks = function() {
    console.log("looping task");

    btccclient.downloadData(function (error) {
        console.log('downloaded data');
        if (error) {

        }
        var rstream = fs.createReadStream('../bitcoinCharts_new.json');
        var wstream = fs.createWriteStream('../bitcoinCharts.json');
        rstream.pipe(wstream);

        this.state++;
        setTimeout(test(), 100);
    });
};

var test = function() {
    this.loopTasks();
};

//exports.loopTasks = loopTasks();