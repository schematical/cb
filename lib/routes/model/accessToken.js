
module.exports = function(app){
    
        var route = require(app.njax.config.njax_dir + '/lib/routes/model/accessToken')(app);
    

    /**
     * Custom Code Goes here
     */
    route.init();

}