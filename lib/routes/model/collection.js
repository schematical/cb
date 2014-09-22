
module.exports = function(app){
    
        var route = require('./_gen/collection.gen')(app);
    

    /**
     * Custom Code Goes here
     */
    route.init();

}