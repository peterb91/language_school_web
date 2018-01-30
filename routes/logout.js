var express = require('express');
var router = express.Router();
require('./routes.js')();

/* GET homepage page after logout */
router.get('/', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
