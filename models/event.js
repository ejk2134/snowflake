var mongoose = require('mongoose');

var attendeeSchema = mongoose.Schema({
    name: String,
    id: String,
    availability: [{type: Date}]
})

var eventSchema = mongoose.Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    attendees: [attendeeSchema]
})

module.exports = mongoose.model('Event', eventSchema);