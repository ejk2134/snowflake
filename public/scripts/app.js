var snowflakeApp = angular.module('snowflakeApp', ['ngRoute']);

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
    .otherwise({
      redirectTo: 'login',
    });
},
]);
