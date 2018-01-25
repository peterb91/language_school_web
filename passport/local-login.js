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
  }));
}