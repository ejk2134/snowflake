snowflakeApp.controller('UserController', function (EventService, $location) {
  console.log('loaded uc with', EventService.funtime);
  var vm = this;

  vm.eventData = EventService.eventData;

  EventService.getAllEvents();

  console.log('UC:', vm.eventData);

  vm.getEvent = function(id){
    EventService.getEvent(id);
  }

  vm.create = function(){
    $location.path('/new');
  }
});
