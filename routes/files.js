var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('files', { title: 'MultiLingua - supporting files' });
});

module.exports = router;
