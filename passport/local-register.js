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
    db.query("SELECT * FROM students WHERE email = ?",
      [email],
      function(err, rows) {
        if (err) {
          return done(err);
        }

        if (rows.length) {
          return done(null, false, req.flash('registerMessage', 'Sorry! That email is already taken.'));
        } else {
          var User = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: email,
            password: bcrypt.hashSync(password, salt),
            language: req.body.language,
            level: req.body.level
          };

          var insertQuery = "INSERT INTO students (firstName, lastName, email, password, language, level) VALUES (?,?,?,?,?,?)";

          db.query(insertQuery, [User.firstName, User.lastName, User.email, User.password, User.language, User.level],
            function(err, rows) {
              if (err) throw err;

              User.id = rows.insertId;
              console.log("New record inserted")
              return done(null, User);
          });
        }
      })
  }));
}