/** ---------- REQUIRE NODE MODULES ---------- **/
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
/** ---------- Environment variables ---------- **/
require('dotenv').config();
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require('./routes/index');
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var database = require('./utils/database');
/** ---------- EXPRESS APP CONFIG ---------- **/
var app = express();
app.use('/public', express.static('public'));  // serve files from public

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** ---------- DATABASE CONNECTION HANDLING ---------- **/
database();

app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));
/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);
/** ---------- SERVER START ---------- **/
var port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Now running on port ', port);
});
