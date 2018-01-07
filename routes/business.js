var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('business', { title: 'MultiLingua School - business course' });
});

module.exports = router;
