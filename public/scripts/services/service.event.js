snowflakeApp.service('EventService', function($http, $location, $route){
    var self = this;
    self.funtime = 'Event Service';

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

    self.confirmDecline = function(id, rsvp){
        $http.put('/private/event/' + rsvp + id)
        .then(function(resp){
            console.log(resp);
            if (rsvp === 'accept/'){
                self.getEvent(id);
            }else{
                $route.reload();
            }
        })
    }

    self.getEvent = function(eventId){

        self.eventData = {events: []};

        $http({
            method: 'GET',
            url: '/private/event/' + eventId,
        }).then(function(resp){
            self.eventData = resp.data;
            console.log('From event request', self.eventData);
            $location.path('/event');
        })
    }

    self.getAllEvents = function(){

        self.eventData = {events: []};

        $http({
            method: 'GET',
            url: '/private/event/all',
        }).then(function(resp){
            console.log('Response.data:', resp.data.events);
            self.eventData.events = resp.data.events;
        })
    }

    self.removeEvent = function(eventId){
        $http.put('/private/event/remove/' + eventId)
        .then(function(resp){
            console.log(resp);
            $location.path('/home');
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