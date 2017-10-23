snowflakeApp.service('EventService', function($http, $location){
    var self = this;
    self.funtime = 'Event Service';

    self.eventData = {events: []};

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
            console.log(self.eventData);
            if (eventId != 'all'){
                $location.path('/event');
            }
        })
    }

    self.getAllEvents = function(){
        $http({
            method: 'GET',
            url: '/private/event/all',
        }).then(function(resp){
            console.log('Response.data:', resp.data.events);
            self.eventData.events = resp.data.events;
        })
    }

    self.updateUserAvailability = function(availabilityObj, eventId){
        console.log('Times:', availabilityObj);
        console.log('ID:', eventId);

        $http.put('/private/event/' + eventId, availabilityObj)
        .then(function(resp){
            console.log(resp);
            self.getEvent(eventId);
        })
    }
    
})