var snowflakeApp = angular.module('snowflakeApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

snowflakeApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: '/public/views/templates/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
    })
    .when('/home', {
      templateUrl: '/public/views/templates/home.html',
      controller: 'UserController',
      controllerAs: 'uc'
    })
    .when('/new', {
      templateUrl: '/public/views/templates/newEvent.html',
      controller: 'CreateController',
      controllerAs: 'cc'
    })
    .when('/entry', {
      templateUrl: '/public/views/templates/entry.html',
      controller: 'EventController',
      controllerAs: 'ec'
    })
    .when('/event', {
      templateUrl: '/public/views/templates/event.html',
      controller: 'EventController',
      controllerAs: 'ec'
    })
    .otherwise({
      redirectTo: 'login',
    });
},
]);
