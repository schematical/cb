var serviceServices = angular.module('crazybride.service.service', ['ngResource']);
serviceServices.factory(
    'ServiceService',
    [
        '$resource',
        function($resource){
            return $resource('/services/:service_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'service_id':'service_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

