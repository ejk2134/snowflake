snowflakeApp.controller('EventController', function(EventService){
    console.log('loaded ec with', EventService.funtime);
    var vm = this;

    vm.event = EventService.eventData;

    vm.userAvailability = {times: []};
    var timeList = vm.userAvailability.times;

    function lookForDate(date){
        for (var i = 0; i < timeList.length; i++){
            if (date.getTime() === timeList[i].getTime()){
                return i;
            }
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

    vm.updateAvailability = function(){
        EventService.updateUserAvailability(vm.userAvailability, vm.event.id)
    }


})