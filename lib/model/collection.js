'use strict';
var fs = require('fs');
var async = require('async');
module.exports = function(app){
    
        var collectionSchema = require('./_gen/collection_gen')(app);
    
    /*
    Custom Code goes here
    */

    return app.mongoose.model('Collection', collectionSchema);
}