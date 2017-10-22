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
        console.log(vm.newEventFrom);
        EventService.newEvent(vm.newEventName, vm.newEventFrom, vm.newEventTo, vm.invitees);
    }
})