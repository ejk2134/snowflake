snowflakeApp.controller('CreateController', function(EventService){
    console.log('loaded cc with', EventService.funtime);
    var vm = this;
    vm.newEventFrom = new Date();
    vm.newEventTo = new Date();

    vm.submit = function(){
        EventService.newEvent(vm.newEventName, vm.newEventFrom, vm.newEventTo);
    }
})