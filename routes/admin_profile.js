var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('admin_profile', { title: 'MultiLingua - admin profile' });
});

module.exports = router;
