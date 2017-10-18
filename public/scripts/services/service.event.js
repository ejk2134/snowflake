snowflakeApp.service('EventService', function($http, $location){
    var self = this;
    self.funtime = 'Event Service';

    self.eventData = {};

    self.newEvent = function(name, dateFrom, dateTo, emails){
        var newEventObj = {
            name: name,
            fromDate: dateFrom,
            toDate: dateTo,
            emails: emails
        }
        $http.post('/private/event', newEventObj)
        .then(function(resp){
            //receive data from posted event
            console.log(resp);
            self.getEvent(resp.data);
        })
    }

    self.getEvent = function(eventId){
        $http({
            method: 'GET',
            url: '/private/event/' + eventId,
        }).then(function(resp){
            self.eventData = resp.data;
            $location.path('/event');
        })
    }
})