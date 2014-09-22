'use strict';
var fs = require('fs');
var async = require('async');

module.exports = function(app){
    
    var accountSchema = require(app.njax.config.njax_dir + '/lib/model/account')(app);

    /*
    Custom Code goes here
    */











    /*
     * END CUSTOM CODE
     *
     */

      /* HERE IS THE AUTH STUFF CUSTOM TO THE ACCOUNT */
    var passport = accountSchema._passport;
    var LocalStrategy = accountSchema._LocalStrategy;

    var AccountModel = app.mongoose.model('Account', accountSchema);

    // use static authenticate method of model in LocalStrategy
    passport.use(new LocalStrategy(AccountModel.authenticate()));

    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(AccountModel.serializeUser());
    passport.deserializeUser(AccountModel.deserializeUser());


    return AccountModel;

}