var router = require('express').Router();

var Event = require('../../models/event');

var makeDateArray = require('../../services/makeDateArray.js');

router.post('/', function(req, res){
    var receivedEvent = req.body;
    var newEvent = Event(receivedEvent);
    newEvent.save(function(error, newThing){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            var dateArray = makeDateArray(newThing.fromDate, newThing.toDate);

            var objectToSend = {
                name: newThing.name,
                dates: dateArray
            }
            res.send(objectToSend);
        }
    })
})

router.get('/:id', function(req, res){
    var eventId = req.params.id;
    Event.find({event: eventId})
})

module.exports = router;