'use strict';
module.exports = function(app){
    
        app.model.Account =  require('./account')(app);
    
        app.model.Application =  require('./application')(app);
    
        app.model.AccessToken =  require('./accessToken')(app);
    
        app.model.RequestCode =  require('./requestCode')(app);
    
        app.model.Event =  require('./event')(app);
    
        app.model.Collection =  require('./collection')(app);
    
        app.model.Vendor =  require('./vendor')(app);
    
        app.model.Service =  require('./service')(app);
    
}