var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('ger_group', { title: 'MultiLingua - german groups' });
});

module.exports = router;
