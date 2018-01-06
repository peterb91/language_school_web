var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('regular', { title: 'MultiLingua School - regular course' });
});

module.exports = router;
