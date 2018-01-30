var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressValidator = require('express-validator');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'MultiLingua - Registration', message: req.flash('registerMessage') });
});

/* Process POST request from register form */
router.post('/',
  passport.authenticate('local-register', { successRedirect: '/login', failureRedirect: '/register', failureFlash: true, session: false }));

module.exports = router;
