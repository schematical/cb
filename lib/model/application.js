'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var applicationSchema = require(app.njax.config.njax_dir + '/lib/model/application')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Application', applicationSchema);
}