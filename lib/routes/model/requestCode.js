
module.exports = function(app){
    
        var route = require(app.njax.config.njax_dir + '/lib/routes/model/requestCode')(app);
    

    /**
     * Custom Code Goes here
     */
    route.init();

}