var requestCodeServices = angular.module('crazybride.requestCode.service', ['ngResource']);
requestCodeServices.factory(
    'RequestCodeService',
    [
        '$resource',
        function($resource){
            return $resource('/request_codes/:requestCode_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'requestCode_id':'requestCode_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

