'use strict';

/* Directives */


angular.module('crazybride.accessToken.directives', [])
    .directive('accessTokenPicker', [ 'AccessToken', function(AccessToken) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/accessTokenPicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.AccessTokenType;

                $scope.accessTokens = window.njax_bootstrap.accessTokens;


                /*
                $scope.addAccessToken = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[accessToken]._id;
                    data['AccessToken'] = $scope.accessToken.value;

                    var accessToken =  new AccessToken(data);

                    accessToken.$save(function(){
                        accessToken.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:accessToken._id,
                            name:$scope.selectedSkill.label,
                            AccessToken:accessToken.AccessToken
                        }
                        entityData[entity] = accessToken[entity];
                        $scope.accessTokens.push(entityData);


                    });
                }




                $scope.removeSkill= function(accessTokens){
                    console.log('accessTokens ', accessTokens );
                    var _accessTokens =  new AccessToken(accessTokens);
                    _accessTokens.$delete(function(){
                        for(var i in $scope.accessTokens){
                            if($scope.accessTokens[i]._id == accessTokens._id){
                                $scope.accessTokens.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);