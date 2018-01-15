var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('user_communicator', { title: 'MultiLingua - communicator' });
});

module.exports = router;
