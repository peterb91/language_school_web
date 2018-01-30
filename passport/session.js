var db            = require('../models/db_connection.js');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  db.query("SELECT * FROM users WHERE id = ? ",
    [user.id], function(err, User) {
      user = User[0];
        done(err, user);
    });
});