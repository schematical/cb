'use strict';

/* Directives */


angular.module('crazybride.service.directives', [])
    .directive('servicePicker', [ 'Service', function(Service) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/servicePicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.ServiceType;

                $scope.services = window.njax_bootstrap.services;


                /*
                $scope.addService = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[service]._id;
                    data['Service'] = $scope.service.value;

                    var service =  new Service(data);

                    service.$save(function(){
                        service.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:service._id,
                            name:$scope.selectedSkill.label,
                            Service:service.Service
                        }
                        entityData[entity] = service[entity];
                        $scope.services.push(entityData);


                    });
                }




                $scope.removeSkill= function(services){
                    console.log('services ', services );
                    var _services =  new Service(services);
                    _services.$delete(function(){
                        for(var i in $scope.services){
                            if($scope.services[i]._id == services._id){
                                $scope.services.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);