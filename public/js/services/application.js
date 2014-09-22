var applicationServices = angular.module('crazybride.application.service', ['ngResource']);
applicationServices.factory(
    'ApplicationService',
    [
        '$resource',
        function($resource){
            return $resource('/apps/:application_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'application_id':'application_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

