var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('account', { title: 'MultiLingua - user account' });
});

module.exports = router;
