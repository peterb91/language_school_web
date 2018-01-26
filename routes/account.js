var db = require('../models/db_connection.js');
var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var bcrypt        = require('bcryptjs');
var salt   = '$2a$10$wENMOiXaNvkXN9BmCbh4ZO';
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('account', { title: 'MultiLingua - user account', user: req.user });
});

router.post('/', function(req, res, next) {

  //Server side request validation
  req.assert('first_name', 'First name is required').notEmpty();
  req.assert('last_name', 'Last Name is required').notEmpty();
  req.assert('language', 'Lnguage is required').notEmpty();
  req.assert('level', 'Level is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();

  var errors = req.validationErrors()
  console.log(req.user.password);
  console.log(req.body.password);
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
