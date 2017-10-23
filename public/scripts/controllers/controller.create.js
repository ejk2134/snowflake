snowflakeApp.controller('CreateController', function(EventService){
    console.log('loaded cc with', EventService.funtime);
    var vm = this;

    vm.invitees = []

    vm.newEventFrom = new Date();
    vm.newEventTo = new Date();

    vm.addInvitee = function(){
        vm.invitees.push(vm.newInvitee);
        vm.newInvitee = '';
    }

    vm.minDate = new Date();

    vm.submit = function(){
        vm.newEventFrom.setHours(0);
        vm.newEventFrom.setMinutes(0);
        vm.newEventFrom.setSeconds(0);
        vm.newEventTo.setHours(0);
        vm.newEventTo.setMinutes(0);
        vm.newEventTo.setSeconds(0);
        EventService.newEvent(vm.newEventName, vm.newEventFrom, vm.newEventTo, vm.invitees);
    }
})