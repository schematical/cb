var path = require('path');
var fs = require('fs');
var async = require('async');
var _ = require('underscore');

module.exports = function(app){
    var ObjectId = app.mongoose.Types.ObjectId;
     var route = app.njax.routes.collection = {
        
            owner_query:function(){
                return { }
            },
        

        init:function(uri){

            if(!uri) uri = '/:account/collection';
            app.locals.partials._collection_edit_form = 'model/_collection_edit_form';
            app.locals.partials._collection_list_single = 'model/_collection_list_single';
            app.param('collection', route.populate)


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
                uri + '/:collection',
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
                    uri + '/:collection',
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

            app.all(uri + '/:collection', [
                route.bootstrap_detail,
                route.render_detail
            ]);
            app.all(uri + '/:collection/edit', [
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
                app.model.Collection.findOne(query, function(err, collection){
                    if(err){
                        return next(err);
                    }
                    if(collection){
                        res.bootstrap('collection', collection);
                    }
                    return next();
                });
            


        },
        render_remove:function(req, res, next){
            res.render('model/collection_list', res.locals.collections);
        },
        render_list:function(req, res, next){
            res.render('model/collection_list', res.locals.collections);
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
                
            
                
                    if(req.query.budget){
                        query['budget'] =   { $regex: new RegExp('^' + req.query.budget + '', 'i') };
                    }
                
            
                
                    if(req.query.guests){
                        query['guests'] =   { $regex: new RegExp('^' + req.query.guests + '', 'i') };
                    }
                
            
                
                if(req.query.city){
                    if(checkForHexRegExp.test(req.query.city)){
                        query['city'] = req.query.city;
                    }
                }
                
            
                
                if(req.query.account){
                    if(checkForHexRegExp.test(req.query.account)){
                        query['account'] = req.query.account;
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
            var collections = null;
            async.series([
                function(cb){
                    
                        app.model.Collection.find(query, function(err, _collections){
                            if(err) return next(err);
                            collections = _collections;
                            return cb();
                        });
                    
                },
                function(cb){
                    res.locals.collections = [];
                    for(var i in collections){
                        var collection_data = collections[i].toObject();
                        
                        res.locals.collections.push(
                            collection_data
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
            if(!req.collection){
                return next();
            }

            

            res.render('model/collection_detail', req.collection.toObject());
        },
        render_edit:function(req, res, next){
            async.series([
                function(cb){
                    if(!req.collection){
                        //return next();
                        req.collection = new app.model.Collection();
                    }
                    return cb();
                },
                
                function(cb){
                    if(req.city){
                        return cb();
                    }
                    app.model.City.find({ }, function(err, citys){
                        if(err) return next(err);
                        var city_objs = [];
                        for(var i in citys){
                            var city_obj = citys[i].toObject();
                            city_obj._selected = (req.collection.city == citys[i]._id);
                            city_objs.push(city_obj);
                        }
                        res.bootstrap('citys', city_objs);
                        return cb();
                    });
                },
                
                function(cb){
                    if(req.account){
                        return cb();
                    }
                    app.model.Account.find({ }, function(err, accounts){
                        if(err) return next(err);
                        var account_objs = [];
                        for(var i in accounts){
                            var account_obj = accounts[i].toObject();
                            account_obj._selected = (req.collection.account == accounts[i]._id);
                            account_objs.push(account_obj);
                        }
                        res.bootstrap('accounts', account_objs);
                        return cb();
                    });
                },
                
                function(cb){

                    res.render('model/collection_edit');
                }
            ]);
        },
        create:function(req, res, next){
            if(!req.user){
                return res.redirect('/');
            }
            if(!req.collection){
                req.collection = new app.model.Collection({
                    
                            city:(req.user && req.user._id || null),
                    
                            account:(req.user && req.user._id || null),
                    
                    cre_date:new Date()
                });
            }
            return next();

        },
        update:function(req, res, next){

            if(!req.collection){
                return next();
                //return next(new Error('Collection not found'));
            }

            
                
                    req.collection.name = req.body.name;
                
            
                
                    req.collection.namespace = req.body.namespace;
                
            
                
                    req.collection.desc = req.body.desc;
                
            
                
                    if(req.njax.files && req.njax.files.original_img){
                        req.collection.original_img = req.njax.files.original_img;
                    }
                
            
                
                    if(req.njax.files && req.njax.files.thumb_img){
                        req.collection.thumb_img = req.njax.files.thumb_img;
                    }
                
            
                
                    req.collection.website_url = req.body.website_url;
                
            
                
                    req.collection.budget = req.body.budget;
                
            
                
                    req.collection.guests = req.body.guests;
                
            
                
                    if(req.city){
                        req.collection.city = req.city._id;
                    }else if(req.body.city){
                        req.collection.city = req.body.city;
                    }
                
            
                
                    if(req.account){
                        req.collection.account = req.account._id;
                    }else if(req.body.account){
                        req.collection.account = req.body.account;
                    }
                
            
                
                    req.collection.archiveDate = req.body.archiveDate;
                
            

            return next();

        },
        update_save:function(req, res, next){
            if(!req.collection){
                return next();
            }
            req.collection.save(function(err, collection){
                //app._refresh_locals();
                res.bootstrap('collection', req.collection);
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
                req.collection.archive(function(err){
                    if(err) return next(err);
                    return next();
                });
            }
        
    }

    route.read_query = route.owner_query;
    route.write_query = route.owner_query;

    return route;

}