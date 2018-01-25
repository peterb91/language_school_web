var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'MultiLingua - Login', message: req.flash('loginMessage') });
});

/* Process POST request from login form */
router.post('/', 
  passport.authenticate('local-login', { successRedirect: '/profile', failureRedirect: '/login', failureFlash: true}),
  function(req, res) {
    console.log("Hello " + user.firstName + "!");

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 30;
    } else {
      req.session.cookie.expires = false;
    }
  res.redirect('/');
});

module.exports = router;
