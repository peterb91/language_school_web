var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('students', { title: 'MultiLingua - students' });
});

module.exports = router;
