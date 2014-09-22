'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var serviceSchema = require('./_gen/service_gen')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Service', serviceSchema);
}