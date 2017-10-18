var router = require('express').Router();

var Event = require('../../models/event');
var User = require('../../models/user')
var ObjectId = require('mongoose').Types.ObjectId;

var getDates = require('../../services/getDates.js');

router.get('/:id', function(req, res){
    eventId = req.params.id;
    console.log('event id:', eventId);

    Event.findOne({_id: eventId}, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
        }else{
            dateArray = getDates(result.fromDate, result.toDate);
            
            var objectToSend = {
                name: result.name,
                dates: dateArray,
                id: result.id
            }
            res.send(objectToSend);
        }
    })
})

router.post('/', function(req, res){
    var receivedEvent = {
        name: req.body.name,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate
    }

    var emails = req.body.emails;

    var newEvent = Event(receivedEvent);
    newEvent.save(function(error, newDocument){
        if (error){
            console.log(error);
            res.sendStatus(500);
        }else{
            for (var i = 0; i < emails.length; i++){
                var query = {googleEmail: emails[i]};
                var target = {$push: {events: {id: newDocument.id, confirmed: false}}};
                User.findOneAndUpdate(query, target, function(err){
                    if (err){
                        console.log(err);
                    }
                })
            }
            res.send(newDocument.id);
        }
    })
})

module.exports = router;