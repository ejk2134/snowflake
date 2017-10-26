snowflakeApp.controller('EventController', function(EventService, $location){
    console.log('loaded ec with', EventService.funtime);
    var vm = this;

    vm.times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 
                13, 14, 15 ,16, 17, 18, 19, 20, 21, 22, 23];

    vm.timeDisplay = ['midnight', '1am', '2am', '3am', '4am', '5am', '5am', '7am', '8am', '9am', '10am', '11am',
                        'noon', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

    vm.event = EventService.eventData;
    //if variable is empty, navigate home -- workaround for empty data on page refresh
    if (vm.event === undefined){
        $location.path('/home');
    }else{
        vm.userAvailability = {times: vm.event.user.availability};
        var timeList = vm.userAvailability.times;
    }

    console.log('Event in EC', vm.event)

    function lookForDate(date){
        for (var i = 0; i < timeList.length; i++){
            if (date.getTime() === new Date(timeList[i]).getTime()){
                return i;
            }
        }
    }

    vm.availabilityClass = function(date, time, minAvailable){
        var dateItem = new Date(date);
        dateItem.setHours(time);
        var count = 0;
        for (var i = 0; i < vm.event.attendees.length; i++){
            for (j = 0; j < vm.event.attendees[i].availability.length; j++){
                if (dateItem.getTime() === new Date(vm.event.attendees[i].availability[j]).getTime()){
                    count++;
                    break;
                }
            }
        }
        if (count >= minAvailable){
            return 'active';
        }
    }

    vm.isActive = function(date, time){
        var dateItem = new Date(date);
        dateItem.setHours(time);
        if (lookForDate(dateItem) === undefined){
            return false;
        }else{
            return true;
        }
    }

    vm.addTime = function(date, time){
        var dateItem = new Date(date);
        dateItem.setHours(time);

        var index = lookForDate(dateItem);

        if (index === undefined){
            timeList.push(dateItem);
        }else{
            timeList.splice(index, 1)
        }
        
        console.log(vm.userAvailability);
    }

    vm.submitAvailabilityChanges = function(){
        EventService.updateUserAvailability(vm.userAvailability, vm.event.id)
    }

    vm.updateAvailability = function(){
        $location.path('/entry');
    }

    vm.leaveEvent = function(){
        EventService.removeEvent(vm.event.id);
    }
})