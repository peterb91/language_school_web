var express = require('express');
var router = express.Router();
require('./routes.js')();

/* GET regular course page. */
router.get('/student', isLoggedIn, function(req, res, next) {
  res.render('files', { title: 'MultiLingua - supporting files' });
});

router.get('/teacher', isLoggedIn, function(req, res, next) {
  res.render('files', { title: 'MultiLingua - files from students' });
});

module.exports = router;
