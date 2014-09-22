'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var accesstokenSchema = require(app.njax.config.njax_dir + '/lib/model/accessToken')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('AccessToken', accesstokenSchema);
}