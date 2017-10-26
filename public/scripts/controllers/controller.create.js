snowflakeApp.controller('CreateController', function(EventService, $mdDialog){
    console.log('loaded cc with', EventService.funtime);
    var vm = this;

    vm.invitees = []

    vm.newEventFrom = new Date();
    vm.newEventTo = new Date();
    vm.newEventName = '';

    vm.addInvitee = function(){
        vm.invitees.push(vm.newInvitee);
        vm.newInvitee = '';
    }

    vm.minDate = new Date();

    vm.emptyInputAlert = function(ev){
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Give your event a description!')
                .ariaLabel('No description alert box')
                .ok('Affirmative')
                .targetEvent(ev)
        );
    };

    vm.submit = function(){
        if (vm.newEventName.trim() === ''){
            vm.emptyInputAlert();
            return 0;
        }
        vm.newEventFrom.setHours(0);
        vm.newEventFrom.setMinutes(0);
        vm.newEventFrom.setSeconds(0);
        vm.newEventFrom.setMilliseconds(0);
        vm.newEventTo.setHours(0);
        vm.newEventTo.setMinutes(0);
        vm.newEventTo.setSeconds(0);
        vm.newEventTo.setMilliseconds(0);
        EventService.newEvent(vm.newEventName, vm.newEventFrom, vm.newEventTo, vm.invitees);
    }
})