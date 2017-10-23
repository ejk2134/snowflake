var router = require('express').Router();

var Event = require('../../models/event');
var User = require('../../models/user')
var ObjectId = require('mongoose').Types.ObjectId;

var getDates = require('../../services/getDates.js');

router.get('/:id', function(req, res){
    eventId = req.params.id;
    console.log('event id:', eventId);

    if (eventId === 'all'){
        User.findOne({_id: req.user.id}, 'events', function(err, result){
            if (err){
                console.log(err);
                res.sendStatus(500);
            }else{
                res.send(result);
            }
        })
    }else{
        Event.findOne({_id: eventId}, function(err, result){
            if (err){
                console.log(err);
                res.sendStatus(500);
            }else{
                dateArray = getDates(result.fromDate, result.toDate);

                var attendees = result.attendees;

                var objectToSend = {
                    id: result.id,
                    name: result.name,
                    dates: dateArray,
                    attendees: attendees
                }
                //send logged-in user's data separately -- needed for client-side logic
                for (var i = 0; i < attendees.length; i++){
                    if (attendees[i]._id == req.user.id){
                        objectToSend.user = attendees[i];
                        break;
                    }
                }

                res.send(objectToSend);
            }
        })
    }
})

router.post('/', function(req, res){
    var receivedEvent = {
        name: req.body.name,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        attendees: [{
            _id: req.user.id,
            name: req.user.googleName,
            availability: []
        }]
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
                var target = {$push: {events: {_id: newDocument.id, name: req.body.name, confirmed: false}}};
                User.findOneAndUpdate(query, target, function(err){
                    if (err){
                        console.log('Error updating invited user', err);
                    }
                })
            }

            var query = {_id: req.user.id};
            var target = {$push: {events: {_id: newDocument.id, name: req.body.name, confirmed: true}}}
            User.findOneAndUpdate(query, target, function (err){
                if (err){
                    console.log('Error updating creator database', err)
                }
            })

            res.send(newDocument.id);
        }
    })
})

router.put('/accept/:id', function(req, res){
    var eventId = req.params.id;

    var query = {_id: eventId};
    var target = {$push: {attendees: {_id: req.user.id, name: req.user.googleName, availability: []}}}
    Event.findOneAndUpdate(query, target, function(err){
        if (err){
            console.log('Error adding user to events collection', err)
            res.sendStatus(500);
        }else{
            var query = {_id: req.user.id, 'events._id': eventId};
            var target = {$set: {'events.$.confirmed': true}};
            User.findOneAndUpdate(query, target, function(err){
                if (err){
                    console.log('Error updating event in user collection', err);
                    res.sendStatus(500);
                }else{
                    res.sendStatus(200);
                }
            })
        }
    })
})

router.put('/:id', function(req, res){
    var availability = req.body.times;
    var eventId = req.params.id;
    console.log('Received object:', availability);
    console.log('Event id:', req.params.id);

    var query = {_id: eventId, 'attendees._id': req.user.id};
    var target = {$set: {'attendees.$.availability': availability}};
    Event.findOneAndUpdate(query, target, function(err){
        if (err){
            console.log(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    })
})

module.exports = router;