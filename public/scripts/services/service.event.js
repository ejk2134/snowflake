snowflakeApp.service('EventService', function($http, $location){
    var self = this;
    self.funtime = 'Event Service';

    self.eventData = {};

    self.newEvent = function(name, dateFrom, dateTo){
        var newEventObj = {
            name: name,
            fromDate: dateFrom,
            toDate: dateTo
        }
        $http.post('/private/event', newEventObj)
        .then(function(resp){
            //receive data from posted event
            self.eventData = resp.data;
            $location.path('/event');
        })
    }

    self.getEvent = function(){
        $http.get('/private/event')
        .then(function(resp){
            console.log(resp.data);
        })
    }
})