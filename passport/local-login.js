var db            = require('../models/db_connection.js');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcryptjs');

module.exports = function(salt) {

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {

    // Server side login form validation
    req.checkBody('email', 'Email is required.').notEmpty().trim();
    req.checkBody('email', 'Invalid email format.').isEmail().trim();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('password', 'The password length must be between 4 and 16.').trim().isLength({min: 4, max: 16});

    var err = req.validationErrors();
    if (!err) {
      db.query("SELECT * FROM users WHERE email = ?",
        [email],
        function(err, rows) {
          if (err)
            return done(err);
  
          if (!rows.length) {
            console.log('Invalid email address: %s', email);
            return done(null, false, req.flash('loginMessage', 'Invalid email address'));
          }
  
          if (bcrypt.hashSync(password, salt) !== rows[0].password) {
            console.log('Invalid password');
            return done(null, false, req.flash('loginMessage', 'Invalid password'));
          }
          user = rows[0]
          console.log('You are successfully logged in using: %s', email);
          return done(null, user);
        })
    } else {
      return done(err, false, { success: false, error: err});
    }
  }));
}  