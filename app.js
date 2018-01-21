var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

// Links to routing files for subpages
var index = require('./routes/index');
var regular = require('./routes/regular');
var business = require('./routes/business');
var intensive = require('./routes/intensive');
var user_profile = require('./routes/user_profile');
var admin_profile = require('./routes/admin_profile');
var user_account = require('./routes/user_account');
var files = require('./routes/files');
// var calendar = require('./routes/calendar');
// var user_communicator = require('./routes/user_communicator');
var homework = require('./routes/homework');
var students = require('./routes/students');
var eng_group = require('./routes/eng_group');
var ger_group = require('./routes/ger_group');
var spa_group = require('./routes/spa_group');
// var admin_communicator = require('./routes/admin_communicator');
var login = require('./routes/login');
var register = require('./routes/register');

var app = express();

// Include Authentication Strategies
require('./passport/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'n0d3ddos my secret key', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Links between requested url and routing files
app.use('/', index);
app.use('/regular', regular);
app.use('/business', business);
app.use('/intensive', intensive);
app.use('/user_profile', user_profile);
app.use('/admin_profile', admin_profile);
app.use('/user_account', user_account);
app.use('/files', files);
// app.use('/calendar', calendar);
// app.use('/user_communicator', user_communicator);
app.use('/homework', homework);
app.use('/students', students);
app.use('/eng_group', eng_group);
app.use('/ger_group', ger_group);
app.use('/spa_group', spa_group);
// app.use('/admin_communicator', admin_communicator);
app.use('/login', login);
app.use('/register', register);

/* route middleware to make sure
app.use(function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}); */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
