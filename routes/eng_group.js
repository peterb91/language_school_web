var express = require('express');
var router = express.Router();
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('eng_group', { title: 'MultiLingua - english groups' });
});

module.exports = router;
