var eventServices = angular.module('crazybride.event.service', ['ngResource']);
eventServices.factory(
    'EventService',
    [
        '$resource',
        function($resource){
            return $resource('/events/:event_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'event_id':'event_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

