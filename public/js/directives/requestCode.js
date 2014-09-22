'use strict';

/* Directives */


angular.module('crazybride.requestCode.directives', [])
    .directive('requestCodePicker', [ 'RequestCode', function(RequestCode) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/requestCodePicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.RequestCodeType;

                $scope.requestCodes = window.njax_bootstrap.requestCodes;


                /*
                $scope.addRequestCode = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[requestCode]._id;
                    data['RequestCode'] = $scope.requestCode.value;

                    var requestCode =  new RequestCode(data);

                    requestCode.$save(function(){
                        requestCode.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:requestCode._id,
                            name:$scope.selectedSkill.label,
                            RequestCode:requestCode.RequestCode
                        }
                        entityData[entity] = requestCode[entity];
                        $scope.requestCodes.push(entityData);


                    });
                }




                $scope.removeSkill= function(requestCodes){
                    console.log('requestCodes ', requestCodes );
                    var _requestCodes =  new RequestCode(requestCodes);
                    _requestCodes.$delete(function(){
                        for(var i in $scope.requestCodes){
                            if($scope.requestCodes[i]._id == requestCodes._id){
                                $scope.requestCodes.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);