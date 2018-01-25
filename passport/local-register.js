var db            = require('../models/db_connection.js');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcryptjs');

module.exports = function(salt) {
  passport.use('local-register', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    db.query("SELECT * FROM users WHERE email = ?",
      [email],
      function(err, rows) {
        if (err) {
          return done(err);
        }

        if (rows.length) {
          console.log('Email: %s is already taken.', email);
          return done(null, false, req.flash('registerMessage', 'Sorry! That email is already taken.'));
        } else {
          var user = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: email,
            password: bcrypt.hashSync(password, salt),
            language: req.body.language,
            level: req.body.level,
            role: 'student'
          };

          var insertQuery = "INSERT INTO users (firstName, lastName, email, password, language, level, role) VALUES (?,?,?,?,?,?,?)";

          db.query(insertQuery, [user.firstName, user.lastName, user.email, user.password, user.language, user.level, user.role],
            function(err, rows) {
              if (err) throw err;

              user.id = rows.insertId;
              console.log("New record inserted to table users");
              return done(null, user);
          });
        }
      })
  }));
}