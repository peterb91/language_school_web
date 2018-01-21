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
    db.query("SELECT * FROM students WHERE email = ?",
      [email],
      function(err, rows) {
        if (err)
          return done(err);

        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'Invalid login details'));
        }

        if (bcrypt.hashSync(password, salt) !== rows[0].password) {
          return done(null, false, req.flash('loginMessage', 'Invalid password'));
        }

        return done(null, rows[0]);
      })
  }));
}