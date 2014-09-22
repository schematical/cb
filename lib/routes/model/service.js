
module.exports = function(app){
    
        var route = require('./_gen/service.gen')(app);
    

    /**
     * Custom Code Goes here
     */
    route.init();

}