
module.exports = function(app){
    
        var route = require('./_gen/vendor.gen')(app);
    

    /**
     * Custom Code Goes here
     */
    route.init();

}