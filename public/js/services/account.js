var accountServices = angular.module('crazybride.account.service', ['ngResource']);
accountServices.factory(
    'AccountService',
    [
        '$resource',
        function($resource){
            return $resource('/:account_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'account_id':'account_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

