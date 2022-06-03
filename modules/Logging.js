const chalk = require('chalk');

// Get the time in a yy/mm/dd hh:mm:ss format
function GetTime()
{
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
}

module.exports.info = function(info){ console.log(`${chalk.gray(GetTime())} ${chalk.blue("[INFO]")} ${info}`); }
module.exports.debug = function(debug){ console.log(`${chalk.gray(GetTime())} ${chalk.red("[DEBG]")} ${debug}`); }
module.exports.error = function(error){ console.log(`${chalk.gray(GetTime())} ${chalk.red("[ERROR]")} ${error}`); }
module.exports.warn = function(warn){ console.log(`${chalk.gray(GetTime())} ${chalk.yellow("[WARN]")} ${warn}`); }
module.exports.success = function(success){ console.log(`${chalk.gray(GetTime())} ${chalk.green("[SUCCESS]")} ${success}`); }

