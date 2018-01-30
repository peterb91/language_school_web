var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var methodOverride = require('method-override');
var fileUpload = require('express-fileupload');
var nodemailer = require('nodemailer');

// Session package
var session = require('express-session');

// Authentication packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

// Links to routing files for subpages
var index = require('./routes/index');
var regular = require('./routes/regular');
var business = require('./routes/business');
var intensive = require('./routes/intensive');
var profile = require('./routes/profile');
var account = require('./routes/account');
var files = require('./routes/files');
// var calendar = require('./routes/calendar');
var homework = require('./routes/homework');
var students = require('./routes/students');
var groups = require('./routes/groups');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var mail = require('./routes/mail');

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
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'n0d3ddos my secret key', 
  duration: 60 * 60 * 1000, 
  resave: false, 
  saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

// Using custom logic to override method
app.use(methodOverride(function (req, res) {
  if (req.body && typeof(req.body) === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// Storing date of session
app.all('*', function findLastVisit(req, res, next) {
  if (req.session.visited) {
    req.lastVisit = req.session.visited;
  }
  // req.session.visited = Date.now();
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if (mm < 10) {
    req.session.visited = dd + '/' + '0' + mm + '/' + yyyy;
  } else {
    req.session.visited = dd + '/' + mm + '/' + yyyy;
  }
  next();
});

// Links between requested url and routing files
app.use('/', index);
app.use('/regular', regular);
app.use('/business', business);
app.use('/intensive', intensive);
app.use('/profile', profile);
app.use('/account', account);
app.use('/files', files);
// app.use('/calendar', calendar);
app.use('/homework', homework);
app.use('/students', students);
app.use('/groups', groups);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/mail', mail);

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
