var collectionServices = angular.module('crazybride.collection.service', ['ngResource']);
collectionServices.factory(
    'CollectionService',
    [
        '$resource',
        function($resource){
            return $resource('/:account/collection/:collection_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'collection_id':'collection_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

