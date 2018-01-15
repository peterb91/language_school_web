var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('homework', { title: 'MultiLingua - homework' });
});

module.exports = router;
