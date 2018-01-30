var express = require('express');
var router = express.Router();
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('files', { title: 'MultiLingua - supporting files' });
});

module.exports = router;
