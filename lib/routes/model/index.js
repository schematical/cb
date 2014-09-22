module.exports = function(app){
    /**
     * Model Routes
     */
    
        
            require('./account')(app);
        
    
        
            require('./application')(app);
        
    
        
            require('./accessToken')(app);
        
    
        
            require('./requestCode')(app);
        
    
        
            require('./event')(app);
        
    
        
            require('./collection')(app);
        
    
        
            require('./vendor')(app);
        
    
        
            require('./service')(app);
        
    

}