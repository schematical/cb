'use strict';
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');

module.exports = function(app){

    var Schema = app.mongoose.Schema;

    var fields = {
        _id: { type: Schema.Types.ObjectId },
    
        
            name:{ type:String },
        
    
        
            namespace:{ type:String },
        
    
        
            desc_raw:String,
            desc_rendered:String,
        
    
        
            original_img:{"type":"String"},
        
    
        
            thumb_img:{"type":"String"},
        
    
        
            website_url:{ type:String },
        
    
        
            vendor:{ type: Schema.Types.ObjectId, ref: 'Vendor' },
        
    
        
            archiveDate:{"type":"Date","format":"date-time"},
        
    
        creDate:Date
    };

    var serviceSchema = new Schema(fields);

    serviceSchema.virtual('uri').get(function(){
        
            
                return '/services/' + (this.namespace || this._id);
            
        
    });

    
        

    
        

    
        
            serviceSchema.virtual('desc').get(function(){
                return this.desc_rendered;
            }).set(function(value){
                if(!value || value.length == 0){
                    return false;
                }
                var markdown = require('markdown').markdown;
                this.desc_raw = value;
                this.desc_rendered = markdown.toHTML(value);
            });
        

    
        
            serviceSchema.virtual('original_img_s3').get(function(){
                var path = require('path');

                var AWS = require('aws-sdk');
                AWS.config.update(app.njax.config.aws);
                var s3 = new AWS.S3();
                var _this = this;
                if(!app.njax.config.local_file_cache){
                    var url = 'http://s3.amazonaws.com/' + app.njax.config.aws.bucket_name  +  '/' + this.original_img;
                }else{
                    var url = '/cache/' + this.original_img;
                }

                return {
                    url:url,
                    getFile:function(local_file_path, callback){
                        if(!callback && _.isFunction(local_file_path)){
                            callback = local_file_path;
                            local_file_path = _this.original_img;
                            /*
                            if(!local_file_path || (!app.njax.isTmpdir(local_file_path)){
                            }
                                local_file_path = app.njax.tmpdir(local_file_path);
                            }
                            */
                        }
                        var dir_name = path.dirname(local_file_path);
                        if(!fs.existsSync(dir_name)){
                            mkdirp.sync(dir_name);
                        }
                        if(app.njax.config.local_file_cache){
                            var cache_path = app.njax.cachedir(_this.original_img);
                            var content = null;
                            if(fs.existsSync(cache_path)){
                                content = fs.readFileSync(
                                    cache_path
                                );
                            }


                            fs.writeFileSync(
                                local_file_path,
                                content
                            );
                            return callback(null,content, local_file_path);
                        }
                        
                        async.series([
                            function(cb){
                                mkdirp(path.dirname(local_file_path), function (err) {
                                    if(err) return callback(err);
                                    return cb();
                                });
                            },
                            function(cb){
                                var stream = require('fs').createWriteStream(local_file_path);
                                var params = {
                                    Bucket: app.njax.config.aws.bucket_name,
                                    Key:_this.original_img
                                }
                                var body = '';
                                s3.getObject(params).
                                    on('error', function(err, response) {
                                        if(err) return callback(err, response);
                                    }).
                                    on('httpData',function (chunk) {
                                        stream.write(chunk);
                                        body += chunk;
                                    }).
                                    on('httpDone',function () {
                                        stream.end(null, null, function(){
                                            callback(null, body, local_file_path);
                                        });

                                    }).
                                    send();
                            }
                        ]);
                    },
                    setFile:function(file_path, callback){
                        var content = fs.readFileSync(file_path);
                        async.series([
                            function(cb){
                                var params = {
                                    Bucket: app.njax.config.aws.bucket_name,
                                    Key: file_path,
                                    Body: content,
                                    ACL: 'public-read',
                                    ContentLength: content.length
                                };
                                s3.putObject(params, function (err, aws_ref) {
                                    if (err) {
                                        return callback(err);
                                    }
                                    _this.original_img = file_path;
                                    return cb(null);
                                });
                            },
                            function(cb){
                                _this.save(function(err){
                                    if(err) return callback(err);
                                    return cb();
                                });
                            },
                            function(cb){
                                return callback();
                            }
                        ]);
                    }
                }
            });
        

    
        
            serviceSchema.virtual('thumb_img_s3').get(function(){
                var path = require('path');

                var AWS = require('aws-sdk');
                AWS.config.update(app.njax.config.aws);
                var s3 = new AWS.S3();
                var _this = this;
                if(!app.njax.config.local_file_cache){
                    var url = 'http://s3.amazonaws.com/' + app.njax.config.aws.bucket_name  +  '/' + this.thumb_img;
                }else{
                    var url = '/cache/' + this.thumb_img;
                }

                return {
                    url:url,
                    getFile:function(local_file_path, callback){
                        if(!callback && _.isFunction(local_file_path)){
                            callback = local_file_path;
                            local_file_path = _this.thumb_img;
                            /*
                            if(!local_file_path || (!app.njax.isTmpdir(local_file_path)){
                            }
                                local_file_path = app.njax.tmpdir(local_file_path);
                            }
                            */
                        }
                        var dir_name = path.dirname(local_file_path);
                        if(!fs.existsSync(dir_name)){
                            mkdirp.sync(dir_name);
                        }
                        if(app.njax.config.local_file_cache){
                            var cache_path = app.njax.cachedir(_this.thumb_img);
                            var content = null;
                            if(fs.existsSync(cache_path)){
                                content = fs.readFileSync(
                                    cache_path
                                );
                            }


                            fs.writeFileSync(
                                local_file_path,
                                content
                            );
                            return callback(null,content, local_file_path);
                        }
                        
                        async.series([
                            function(cb){
                                mkdirp(path.dirname(local_file_path), function (err) {
                                    if(err) return callback(err);
                                    return cb();
                                });
                            },
                            function(cb){
                                var stream = require('fs').createWriteStream(local_file_path);
                                var params = {
                                    Bucket: app.njax.config.aws.bucket_name,
                                    Key:_this.thumb_img
                                }
                                var body = '';
                                s3.getObject(params).
                                    on('error', function(err, response) {
                                        if(err) return callback(err, response);
                                    }).
                                    on('httpData',function (chunk) {
                                        stream.write(chunk);
                                        body += chunk;
                                    }).
                                    on('httpDone',function () {
                                        stream.end(null, null, function(){
                                            callback(null, body, local_file_path);
                                        });

                                    }).
                                    send();
                            }
                        ]);
                    },
                    setFile:function(file_path, callback){
                        var content = fs.readFileSync(file_path);
                        async.series([
                            function(cb){
                                var params = {
                                    Bucket: app.njax.config.aws.bucket_name,
                                    Key: file_path,
                                    Body: content,
                                    ACL: 'public-read',
                                    ContentLength: content.length
                                };
                                s3.putObject(params, function (err, aws_ref) {
                                    if (err) {
                                        return callback(err);
                                    }
                                    _this.thumb_img = file_path;
                                    return cb(null);
                                });
                            },
                            function(cb){
                                _this.save(function(err){
                                    if(err) return callback(err);
                                    return cb();
                                });
                            },
                            function(cb){
                                return callback();
                            }
                        ]);
                    }
                }
            });
        

    
        

    
        

    
        

    

    
        serviceSchema.virtual('archive').get(function(){
            return function(callback){
                this.archiveDate = new Date();
                this.save(callback);
            }
        });
    



    serviceSchema.pre('save', function(next){
        if(!this._id){
            this._id = new app.mongoose.Types.ObjectId();
            this.creDate = new Date();
        }
        return next();
    });

    if (!serviceSchema.options.toObject) serviceSchema.options.toObject = {};
    serviceSchema.options.toObject.transform = function (doc, ret, options) {
        ret.uri = doc.uri;
        ret.url = app.njax.config.domain + ':' + (app.njax.config.public_port || app.njax.config.port) + doc.uri;
        ret.api_url = 'api.' +  ret.url;
        
            

            
        
            

            
        
            
                ret.desc = doc.desc_rendered;
                ret.desc_raw = doc.desc_raw;
            
        
            
                ret.original_img_s3 = {
                    url:doc.original_img_s3.url,
                    path:doc.original_img
                }
            
        
            
                ret.thumb_img_s3 = {
                    url:doc.thumb_img_s3.url,
                    path:doc.thumb_img
                }
            
        
            

            
        
            

            
        
            

            
        
    }

    return serviceSchema;
}