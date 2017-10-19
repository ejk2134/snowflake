snowflakeApp.controller('UserController', function (EventService, $location) {
  console.log('loaded uc');
  var vm = this;

  vm.getEvent = function(id){
    EventService.getEvent(id);
  }

  vm.create = function(){
    $location.path('/new');
  }
});
