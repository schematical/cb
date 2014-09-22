'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var eventSchema = require(app.njax.config.njax_dir + '/lib/model/event')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Event', eventSchema);
}