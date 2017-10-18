snowflakeApp.controller('EventController', function(EventService){
    console.log('loaded ec with', EventService.funtime);
    var vm = this;

    vm.event = EventService.eventData;
    console.log(vm.event);
})