var express = require('express');
var router = express.Router();
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/*
require('./index');
require('./regular');
require('./business');
require('./intensive');
require('./login');
require('./register');
require('./logout');
require('./user_profile');
require('./user_account');
require('./files');
require('./homework');
require('./admin_profile');
require('./students');
require('./eng_group');
require('./ger_group');
require('./spa_group');
*/

module.exports = function() {
    this.isLoggedIn = function(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
};
}