snowflakeApp.controller('UserController', function (EventService, AuthFactory, $location, $mdDialog) {
  if (AuthFactory.Status.loggedIn === false){
    $location.path('/login');
  }

  console.log('loaded uc with', EventService.funtime);
  var vm = this;

  EventService.getAllEvents();

  vm.eventData = EventService.eventData;

  console.log('UC:', vm.eventData);

  vm.showConfirmation = function(eventName, eventId, ev){
    var confirm = $mdDialog.confirm()
      .title('You\'ve been invited!')
      .textContent(eventName)
      .ariaLabel('Event invite:', eventName)
      .targetEvent(ev)
      .ok('Accept')
      .cancel('Decline');
    
    $mdDialog.show(confirm).then(function(){
      EventService.confirmDecline(eventId, 'accept/')
    }, function(){
      EventService.confirmDecline(eventId, 'decline/')
    })
  }

  vm.getEvent = function(id){
    EventService.getEvent(id);
  }

  vm.create = function(){
    $location.path('/new');
  }
});
