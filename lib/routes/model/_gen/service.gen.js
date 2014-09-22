var path = require('path');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

module.exports = function(app){
    var ObjectId = app.mongoose.Types.ObjectId;
     var route = app.njax.routes.service = {
        
            owner_query:function(){
                return { }
            },
        

        init:function(uri){

            if(!uri) uri = '/services';
            app.locals.partials._service_edit_form = 'model/_service_edit_form';
            app.locals.partials._service_list_single = 'model/_service_list_single';
            app.param('service', route.populate)


            app.post(
                uri,
                [
                    route.auth_create,
                    
                        app.njax.s3.route(['original_img','thumb_img']),
                    
                    route.validate,
                    route.pre_create,
                    route.create,
                    route.update,
                    route.pre_update_save,
                    route.update_save,
                    route.post_create,
                    route.bootstrap_detail,
                    route.broadcast_create,
                    route.render_detail
                ]
            );
            app.post(
                uri + '/new',
                [
                    route.auth_create,
                    
                        app.njax.s3.route(['original_img','thumb_img']),
                    
                    route.validate,
                    route.pre_create,
                    route.create,
                    route.update,
                    route.pre_update_save,
                    route.update_save,
                    route.post_create,
                    route.bootstrap_detail,
                    route.broadcast_create,
                    route.render_detail
                ]
            );
            app.post(
                uri + '/:service',
                [
                    route.auth_update,
                    
                    app.njax.s3.route(['original_img','thumb_img']),
                    
                    route.validate,
                    route.pre_update,
                    route.update,
                    route.pre_update_save,
                    route.update_save,
                    route.post_update,
                    route.bootstrap_detail,
                    route.broadcast_update,
                    route.render_detail
                ]
            );
            
                app.delete(
                    uri + '/:service',
                    [
                        route.auth_update,
                        route.pre_remove,
                        route.remove,
                        route.post_remove,
                        route.bootstrap_detail,
                        route.broadcast_remove,
                        route.render_remove
                    ]
                );
            

            app.all(uri, [
                route.populate_list_query,
                route.populate_list,
                route.bootstrap_list,
                route.render_list
            ]);
            app.all(uri + '/new', [
                route.bootstrap_edit,
                route.render_edit
            ]);

            app.all(uri + '/:service', [
                route.bootstrap_detail,
                route.render_detail
            ]);
            app.all(uri + '/:service/edit', [
                route.auth_update,
                route.bootstrap_edit,
                route.render_edit
            ]);


        },
        auth_update:function(req, res, next){
            
                if(!req.user){
                    return next(404);//res.redirect('/');
                }
                return next();
             
        },
        auth_create:function(req, res, next){
             //ENtities that have not been created do not have an owner to manage
             return next();

        },
        populate:function(req, res, next, id){
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            
                var or_condition = []

                if(checkForHexRegExp.test(id)){
                    or_condition.push({ _id:new ObjectId(id) });
                }
                
                    or_condition.push({ namespace:id });
                
                if(or_condition.length == 0){
                    return next();
                }
                var query = {
                    $and:[
                        { $or: or_condition }

                    
                        ,
                        { $or: [
                            { archiveDate: { $gt: new Date() } },
                            { archiveDate: null }
                        ] }

                    
                     ]
                };
                app.model.Service.findOne(query, function(err, service){
                    if(err){
                        return next(err);
                    }
                    if(service){
                        res.bootstrap('service', service);
                    }
                    return next();
                });
            


        },
        render_remove:function(req, res, next){
            res.render('model/service_list', res.locals.services);
        },
        render_list:function(req, res, next){
            res.render('model/service_list', res.locals.services);
        },
        populate_list_query:function(req, res, next){
            var query = _.clone(route.read_query(req));
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            
                
                    if(req.query.name){
                        query['name'] =   { $regex: new RegExp('^' + req.query.name + '', 'i') };
                    }
                
            
                
                    if(req.query.namespace){
                        query['namespace'] =   { $regex: new RegExp('^' + req.query.namespace + '', 'i') };
                    }
                
            
                
                    if(req.query.desc){
                        query['desc'] =   { $regex: new RegExp('^' + req.query.desc + '', 'i') };
                    }
                
            
                
                
            
                
                
            
                
                    if(req.query.website_url){
                        query['website_url'] =   { $regex: new RegExp('^' + req.query.website_url + '', 'i') };
                    }
                
            
                
                if(req.query.vendor){
                    if(checkForHexRegExp.test(req.query.vendor)){
                        query['vendor'] = req.query.vendor;
                    }
                }
                
            
                
                
            


            req._list_query = query;
            return next();
        },
        populate_list:function(req, res, next){
            var query = req._list_query;
            if(!query){
                return next();
            }
            var services = null;
            async.series([
                function(cb){
                    
                        app.model.Service.find(query, function(err, _services){
                            if(err) return next(err);
                            services = _services;
                            return cb();
                        });
                    
                },
                function(cb){
                    res.locals.services = [];
                    for(var i in services){
                        var service_data = services[i].toObject();
                        
                        res.locals.services.push(
                            service_data
                        );
                    }
                    return cb();
                },
                function(cb){
                    return next();
                }
            ]);
        },
        render_detail:function(req, res, next){
            if(!req.service){
                return next();
            }

            

            res.render('model/service_detail', req.service.toObject());
        },
        render_edit:function(req, res, next){
            async.series([
                function(cb){
                    if(!req.service){
                        //return next();
                        req.service = new app.model.Service();
                    }
                    return cb();
                },
                
                function(cb){
                    if(req.vendor){
                        return cb();
                    }
                    app.model.Vendor.find({ }, function(err, vendors){
                        if(err) return next(err);
                        var vendor_objs = [];
                        for(var i in vendors){
                            var vendor_obj = vendors[i].toObject();
                            vendor_obj._selected = (req.service.vendor == vendors[i]._id);
                            vendor_objs.push(vendor_obj);
                        }
                        res.bootstrap('vendors', vendor_objs);
                        return cb();
                    });
                },
                
                function(cb){

                    res.render('model/service_edit');
                }
            ]);
        },
        create:function(req, res, next){
            if(!req.user){
                return res.redirect('/');
            }
            if(!req.service){
                req.service = new app.model.Service({
                    
                            vendor:(req.vendor && req.vendor._id || null),
                    
                    cre_date:new Date()
                });
            }
            return next();

        },
        update:function(req, res, next){

            if(!req.service){
                return next();
                //return next(new Error('Service not found'));
            }

            
                
                    req.service.name = req.body.name;
                
            
                
                    req.service.namespace = req.body.namespace;
                
            
                
                    req.service.desc = req.body.desc;
                
            
                
                    if(req.njax.files && req.njax.files.original_img){
                        req.service.original_img = req.njax.files.original_img;
                    }
                
            
                
                    if(req.njax.files && req.njax.files.thumb_img){
                        req.service.thumb_img = req.njax.files.thumb_img;
                    }
                
            
                
                    req.service.website_url = req.body.website_url;
                
            
                
                    if(req.vendor){
                        req.service.vendor = req.vendor._id;
                    }else if(req.body.vendor){
                        req.service.vendor = req.body.vendor;
                    }
                
            
                
                    req.service.archiveDate = req.body.archiveDate;
                
            

            return next();

        },
        update_save:function(req, res, next){
            if(!req.service){
                return next();
            }
            req.service.save(function(err, service){
                //app._refresh_locals();
                res.bootstrap('service', req.service);
                return next();
            });
        },
        query:function(req, res, next){
            return next();
        },
        pre_update_save:function(req, res, next){
            return next();
        },
        bootstrap_list:function(req, res, next){
            return next();
        },
        bootstrap_detail:function(req, res, next){
            
            return next();
        },
        bootstrap_edit:function(req, res, next){
            return next();
        },
        validate:function(req, res, next){
            return next();
        },
        pre_update:function(req, res, next){
            return next();
        },
        pre_create:function(req, res, next){
            return next();
        },
        pre_create_properties:function(req, res, next){
            return next();
        },
        pre_remove:function(req, res, next){
            return next();
        },
        post_update:function(req, res, next){
            return next();
        },
        post_create:function(req, res, next){
            return next();
        },
        post_remove:function(req, res, next){
                return next();
        },
        broadcast_create:function(req, res, next){
            
                return next();
            
        },
        broadcast_update:function(req, res, next){
            
                return next();
            
        },
        broadcast_remove:function(req, res, next){
            
                return next();
            
        },
        
            remove:function(req, res,next){
                if(!req.user){
                    return next();
                }
                req.service.archive(function(err){
                    if(err) return next(err);
                    return next();
                });
            }
        
    }

    route.read_query = route.owner_query;
    route.write_query = route.owner_query;

    return route;

}