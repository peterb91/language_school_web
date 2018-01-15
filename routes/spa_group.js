var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('spa_group', { title: 'MultiLingua - spanish groups' });
});

module.exports = router;
