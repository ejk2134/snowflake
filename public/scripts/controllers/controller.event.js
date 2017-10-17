snowflakeApp.controller('EventController', function(EventService){
    console.log('loaded ec with', EventService.funtime);
    var vm = this;
    vm.newEventFrom = new Date();
    vm.newEventTo = new Date();

    vm.submit = function(){
        EventService.newEvent();
    }
})