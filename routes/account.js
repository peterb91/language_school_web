var db = require('../models/db_connection.js');
var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var bcrypt        = require('bcryptjs');
var salt   = '$2a$10$wENMOiXaNvkXN9BmCbh4ZO';
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('account', { title: 'MultiLingua - user account', user: req.user, messages: req.flash() });
});

router.post('/', function(req, res, next) {

  //Server side request validation
  req.checkBody('first_name', 'First name is required').notEmpty().trim();
  req.checkBody('last_name', 'Last Name is required').notEmpty().trim();
  req.checkBody('language', 'Lnguage is required').notEmpty().trim();
  req.checkBody('level', 'Level is required').notEmpty();
  req.checkBody('level', 'Level should consist of one capital letter A-C and one digit 1-2').trim().matches(/[A-C][1-2]/);
  req.checkBody('email', 'Email is required.').notEmpty().trim();
  req.checkBody('email', 'Invalid email format.').isEmail().trim();
  if (req.body.password) {
    req.checkBody('password', 'Password is required.').notEmpty();
   req.checkBody('password', 'The password length must be between 4 and 16.').trim().isLength({min: 4, max: 16});
   req.checkBody('confirm_password', 'Confirm password is required').notEmpty();
   req.checkBody('confirm_password', 'Passwords do not match').equals(req.body.password);
  }

  var errors = req.validationErrors()

  if (!req.body.password) {
    var password = req.user.password;
  } else {
    var password = bcrypt.hashSync(req.body.password, salt);
  }

  if( !errors ) {

    //No errors were found.  Passed Validation!
    var user = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      password: password,
      language: req.body.language,
      level: req.body.level
    }
        
    var insertQuery = "UPDATE users SET firstName=?, lastName=?, email=?, password=?, language=?, level=? WHERE id=?";
    db.query(insertQuery, [user.firstName, user.lastName, user.email, user.password, user.language, user.level, req.user.id],
      function(err, rows) {
        if (err) {
          req.flash('error', err);
          console.log('Error when updating user data')
          res.redirect('/account');
        } else {
          req.flash('success', 'Data updated successfully!')
          console.log("User data updated successfully");
          res.redirect('/account');
        }
    });
    } else {

      // Display errors to user
      var error_msg = ''
      errors.forEach(function(error) {
        error_msg += error.msg + '<br>'
      })
      req.flash('error', error_msg)

      res.redirect('/account');
    }
});
  

module.exports = router;
