snowflakeApp.controller('UserController', function (EventService, $http) {
  console.log('loaded uc');
  var vm = this;

  vm.getEvent = function(id){
    EventService.getEvent(id);
  }

  
});
