'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var requestcodeSchema = require(app.njax.config.njax_dir + '/lib/model/requestCode')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('RequestCode', requestcodeSchema);
}