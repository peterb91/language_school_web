var express = require('express');
var router = express.Router();
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'MultiLingua - users profile', user: req.user, session: req.session });
});

module.exports = router;
