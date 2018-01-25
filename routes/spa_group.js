var express = require('express');
var router = express.Router();
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('spa_group', { title: 'MultiLingua - spanish groups' });
});

module.exports = router;
