var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('intensive', { title: 'MultiLingua School - intensive course' });
});

module.exports = router;
