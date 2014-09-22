module.exports = function(app){
    /*
    FIRST INIT AUTH STUFF
     */
    app.njax.routes.auth.init();


    app.all('/', function(req, res, next){
        res.render('index');
    });


    /**
     * Model Routes
     */
    require('./model/index')(app);
}