var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('user_profile', { title: 'MultiLingua - users profile' });
});

module.exports = router;
