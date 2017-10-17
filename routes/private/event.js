var router = require('express').Router();

var Event = require('../../models/event');

router.post('/', function(req, res){
    var receivedEvent = req.body;
    var newEvent = Event(receivedEvent);
    newEvent.save(function(error){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    })
})

module.exports = router;