var db            = require('../models/db_connection.js');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcryptjs');
var expressValidator = require('express-validator');

module.exports = function(salt) {
  passport.use('local-register', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    // Server side registration form validation
    req.checkBody('first_name', 'First name is required').notEmpty().trim();
    req.checkBody('last_name', 'Last Name is required').notEmpty().trim();
    req.checkBody('language', 'Lnguage is required').notEmpty().trim();
    req.checkBody('level', 'Level is required').notEmpty();
    req.checkBody('level', 'Level should consist of one capital letter A-C and one digit 1-2').trim().matches(/[A-C][1-2]/);
    req.checkBody('email', 'Email is required.').notEmpty().trim();
    req.checkBody('email', 'Invalid email format.').isEmail().trim();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('password', 'The password length must be between 4 and 16.').trim().isLength({min: 4, max: 16});
    req.checkBody('confirm_password', 'Confirm password is required').notEmpty();
    req.checkBody('confirm_password', 'Passwords do not match').equals(req.body.password);

    var err = req.validationErrors();
    if (!err) {
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
    } else {
      return done(err, false, { success: false, error: err});
    }
  }));
}