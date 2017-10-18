var router = require('express').Router();

var Event = require('../../models/event');

var getDates = require('../../services/getDates.js');

router.get('/:id', function(req, res){
    eventId = req.params.id;

    Event.find({id: eventId})
})

router.post('/', function(req, res){
    var receivedEvent = req.body;
    var newEvent = Event(receivedEvent);
    newEvent.save(function(error, newThing){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            dateArray = getDates(newThing.fromDate, newThing.toDate);

            var objectToSend = {
                name: newThing.name,
                dates: dateArray,
                id: newThing.id
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