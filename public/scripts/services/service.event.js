snowflakeApp.service('EventService', function($http, $location){
    var self = this;
    self.funtime = 'Event Service';

    var newEventObj = {
        name: 'fun but generic event',
        fromDate: '2017-10-25',
        toDate: '2017-11-01'
    }

    self.newEvent = function(){
        $http.post('/private/event', newEventObj)
            .then(function(resp){
                console.log(resp);
            })
    }
})