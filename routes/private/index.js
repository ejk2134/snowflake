/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var calendar = require('./calendar');
var event = require('./event');

/** ---------- SUBROUTES ---------- **/
router.use('/calendar', calendar);
router.use('/event', event);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
