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

    vm.submit = function(){
        EventService.newEvent(vm.newEventName, vm.newEventFrom, vm.newEventTo, vm.invitees);
    }
})