var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer2_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds151232.mlab.com:51232/heroku_60r2dvbn'; // user yours
}

//mongodb://heroku_bkxx03k1:k1k8ndgof4gsm5vge38qfjqq7@ds015750.mlab.com:15750/heroku_bkxx03k1
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports =  db;