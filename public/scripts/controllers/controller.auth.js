snowflakeApp.controller('AuthController', function (AuthFactory, $location) {
  var vm = this;
  var authFactory = AuthFactory;
  vm.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
  if (vm.loggedIn){
    $location.path('/home');
  }
});
