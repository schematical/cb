'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var vendorSchema = require('./_gen/vendor_gen')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Vendor', vendorSchema);
}