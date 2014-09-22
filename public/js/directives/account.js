'use strict';

/* Directives */


angular.module('crazybride.account.directives', [])
    .directive('accountPicker', [ 'Account', function(Account) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/accountPicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.AccountType;

                $scope.accounts = window.njax_bootstrap.accounts;


                /*
                $scope.addAccount = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[account]._id;
                    data['Account'] = $scope.account.value;

                    var account =  new Account(data);

                    account.$save(function(){
                        account.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:account._id,
                            name:$scope.selectedSkill.label,
                            Account:account.Account
                        }
                        entityData[entity] = account[entity];
                        $scope.accounts.push(entityData);


                    });
                }




                $scope.removeSkill= function(accounts){
                    console.log('accounts ', accounts );
                    var _accounts =  new Account(accounts);
                    _accounts.$delete(function(){
                        for(var i in $scope.accounts){
                            if($scope.accounts[i]._id == accounts._id){
                                $scope.accounts.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);