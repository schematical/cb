var vendorServices = angular.module('crazybride.vendor.service', ['ngResource']);
vendorServices.factory(
    'VendorService',
    [
        '$resource',
        function($resource){
            return $resource('/vendors/:vendor_id', {}, {
                query: {
                    method:'GET',
                    params:{
                        'vendor_id':'vendor_id'
                    },
                    isArray:true
                }
            });
        }
    ]
);

