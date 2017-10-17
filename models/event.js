var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    attendees: [attendeeSchema]
})

var attendeeSchema = mongoose.Schema({
    name: String,
    id: String,
    availability = [{type: Date}]
})

module.exports = mongoose.model('Event', eventSchema);