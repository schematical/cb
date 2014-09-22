'use strict';

/* Directives */


angular.module('crazybride.application.directives', [])
    .directive('applicationPicker', [ 'Application', function(Application) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/applicationPicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.ApplicationType;

                $scope.applications = window.njax_bootstrap.applications;


                /*
                $scope.addApplication = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[application]._id;
                    data['Application'] = $scope.application.value;

                    var application =  new Application(data);

                    application.$save(function(){
                        application.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:application._id,
                            name:$scope.selectedSkill.label,
                            Application:application.Application
                        }
                        entityData[entity] = application[entity];
                        $scope.applications.push(entityData);


                    });
                }




                $scope.removeSkill= function(applications){
                    console.log('applications ', applications );
                    var _applications =  new Application(applications);
                    _applications.$delete(function(){
                        for(var i in $scope.applications){
                            if($scope.applications[i]._id == applications._id){
                                $scope.applications.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);