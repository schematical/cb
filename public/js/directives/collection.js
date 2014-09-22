'use strict';

/* Directives */


angular.module('crazybride.collection.directives', [])
    .directive('collectionPicker', [ 'Collection', function(Collection) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/collectionPicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.CollectionType;

                $scope.collections = window.njax_bootstrap.collections;


                /*
                $scope.addCollection = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[collection]._id;
                    data['Collection'] = $scope.collection.value;

                    var collection =  new Collection(data);

                    collection.$save(function(){
                        collection.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:collection._id,
                            name:$scope.selectedSkill.label,
                            Collection:collection.Collection
                        }
                        entityData[entity] = collection[entity];
                        $scope.collections.push(entityData);


                    });
                }




                $scope.removeSkill= function(collections){
                    console.log('collections ', collections );
                    var _collections =  new Collection(collections);
                    _collections.$delete(function(){
                        for(var i in $scope.collections){
                            if($scope.collections[i]._id == collections._id){
                                $scope.collections.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);