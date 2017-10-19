var mongoose = require('mongoose');
var User = require('./user');

var attendeeSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    availability: [Date]
})

var eventSchema = mongoose.Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    attendees: [attendeeSchema]
})

module.exports = mongoose.model('Event', eventSchema);