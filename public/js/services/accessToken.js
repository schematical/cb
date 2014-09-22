var accessTokenServices = angular.module('crazybride.accessToken.service', ['ngResource']);
accessTokenServices.factory(
    'AccessTokenService',
    [
        '$resource',
        function($resource){
            return $resource('/access_tokens/:accessToken_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'accessToken_id':'accessToken_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

