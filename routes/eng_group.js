var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('eng_group', { title: 'MultiLingua - english groups' });
});

module.exports = router;
