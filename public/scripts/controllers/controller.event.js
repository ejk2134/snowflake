snowflakeApp.controller('EventController', function(EventService){
    console.log('loaded ec with', EventService.funtime);
    var vm = this;

    vm.event = EventService.eventData;

    vm.addTime = function(date, time){
        var dateItem = new Date(date);
        dateItem.setHours(time);
        console.log(dateItem);
    }
})