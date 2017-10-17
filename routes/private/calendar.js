/**
 * Handles requests for Google calendar data.
 * @module private/calendar
 */
var express = require('express');
var router = express.Router();
var auth = require('../../utils/auth.js');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var passport = require('../../auth/passport.js')
var gcal = require('google-calendar')
var request = require('request');
/**
 * GET /private/calendar
 *
 * @todo Get some data from the Google API. Call the API using the token
 * saved to the user.
 * @see {@link https://www.npmjs.com/package/google-calendar}
 * @see {@link https://developers.google.com/google-apps/calendar/v3/reference/#Calendars}
 *
 */
router.get('/', function (req, res) {
  res.send({ message: 'hi' });
});

router.post('/', function (req, res, next) {
  
      // if session is valid return true and username
      if (req.isAuthenticated()) {
          next();
      } else {
          // otherwise send 401 and authed false
          res.status(401).send({ isAuth: false });
      }
  
  }, function (req, res){
  var event = {
    description: 'a crazy new years party',
    start: {
      dateTime: '2017-12-31T23:20:50.52Z'
    },
    end: {
      dateTime: '2018-01-01T01:20:50.52Z'
    }
  }

  // var accessToken     = req.user.googleToken;
  // var calendarId      = 'primary';
  
  // gcal(accessToken).events.list(calendarId, {maxResults:1}, function(err, data) {
  //   if(err) {
  //     console.log('error:', err);
  //     res.send(500,err);
  //   }
  //   console.log(data)
  //   if(data.nextPageToken){
  //     gcal(accessToken).events.list(calendarId, {maxResults:1, pageToken:data.nextPageToken}, function(err, data) {
  //       console.log(data.items)
  //     })
  //   }
    
    
  //   return res.send(data);
  // });

  console.log('user:', req.user);

  var token = 'Bearer ' + req.user.googleToken;

  var options = {
    url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    method: 'POST',
    headers: {
      'Authorization': token
    },
    resource: event
  }

  request(options, function(err, response, body){
    console.log('error:', err);
    console.log('status code:', response && response.statusCode);
    console.log('body:', body);
    res.sendStatus(200);
  })
  
  // var calendar = google.calendar('v3');

  // calendar.events.insert({
  //   auth: req.user.googleToken,
  //   calendarId: 'primary',
  //   resource: event
  // }, function(err, event){
  //   if(err){
  //     console.log('There was an error contacting the Google service:' + err)
  //     res.sendStatus(500);
  //   }else{
  //     console.log('event created');
  //     res.sendStatus(201);
  //   }
  // })
})

module.exports = router;
