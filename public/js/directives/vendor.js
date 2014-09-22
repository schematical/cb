'use strict';

/* Directives */


angular.module('crazybride.vendor.directives', [])
    .directive('vendorPicker', [ 'Vendor', function(Vendor) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/vendorPicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.VendorType;

                $scope.vendors = window.njax_bootstrap.vendors;


                /*
                $scope.addVendor = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[vendor]._id;
                    data['Vendor'] = $scope.vendor.value;

                    var vendor =  new Vendor(data);

                    vendor.$save(function(){
                        vendor.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:vendor._id,
                            name:$scope.selectedSkill.label,
                            Vendor:vendor.Vendor
                        }
                        entityData[entity] = vendor[entity];
                        $scope.vendors.push(entityData);


                    });
                }




                $scope.removeSkill= function(vendors){
                    console.log('vendors ', vendors );
                    var _vendors =  new Vendor(vendors);
                    _vendors.$delete(function(){
                        for(var i in $scope.vendors){
                            if($scope.vendors[i]._id == vendors._id){
                                $scope.vendors.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);