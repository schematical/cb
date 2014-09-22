'use strict';


// Declare app level module which depends on filters, and services
angular.module(
        'crazybride',
    [
        'ngRoute',
        'ngCookies',
        
            'crazybride.account.service',
            'crazybride.account.controller',
            'crazybride.account.directives',
        
            'crazybride.application.service',
            'crazybride.application.controller',
            'crazybride.application.directives',
        
            'crazybride.accessToken.service',
            'crazybride.accessToken.controller',
            'crazybride.accessToken.directives',
        
            'crazybride.requestCode.service',
            'crazybride.requestCode.controller',
            'crazybride.requestCode.directives',
        
            'crazybride.event.service',
            'crazybride.event.controller',
            'crazybride.event.directives',
        
            'crazybride.collection.service',
            'crazybride.collection.controller',
            'crazybride.collection.directives',
        
            'crazybride.vendor.service',
            'crazybride.vendor.controller',
            'crazybride.vendor.directives',
        
            'crazybride.service.service',
            'crazybride.service.controller',
            'crazybride.service.directives',
        
        'crazybride.filters',
        'crazybride.directives'
    ]
).config(
        [
            '$routeProvider',
            function($routeProvider) {

                $routeProvider.when('/', { templateUrl: 'partials/welcome.html', controller: 'WelcomeCtl'});
                $routeProvider.when('/home', { templateUrl: 'partials/home.html', controller: 'HomeCtl'});
                $routeProvider.when('/draw', { templateUrl: 'partials/draw.html', controller: 'DrawCtl'});
                $routeProvider.when('/suggest', { templateUrl: 'partials/suggest.html', controller: 'SuggestCtl'});
                $routeProvider.when('/display', { templateUrl: 'partials/display.html', controller: 'DisplayCtl'});
                $routeProvider.otherwise({redirectTo: '/'});
        }
    ]
);