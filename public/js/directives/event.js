'use strict';

/* Directives */


angular.module('crazybride.event.directives', [])
    .directive('eventPicker', [ 'Event', function(Event) {

        return {
            replace:true,
            scope:{ },
            templateUrl: '/templates/directives/eventPicker.html',
            link: function($scope, element, attributes) {
                $scope.ele_name = attributes.name;
                //var entity = attributes.EventType;

                $scope.events = window.njax_bootstrap.events;


                /*
                $scope.addEvent = function(){
                    var data = {}
                    data['_id'] = window.njax_bootstrap[event]._id;
                    data['Event'] = $scope.event.value;

                    var event =  new Event(data);

                    event.$save(function(){
                        event.name = $scope.selectedSkill.name;
                        var entityData = {
                            _id:event._id,
                            name:$scope.selectedSkill.label,
                            Event:event.Event
                        }
                        entityData[entity] = event[entity];
                        $scope.events.push(entityData);


                    });
                }




                $scope.removeSkill= function(events){
                    console.log('events ', events );
                    var _events =  new Event(events);
                    _events.$delete(function(){
                        for(var i in $scope.events){
                            if($scope.events[i]._id == events._id){
                                $scope.events.splice(i, 1);
                            }
                        }

                    });
                }
                */
            }

        };
    }]);