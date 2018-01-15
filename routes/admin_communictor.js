var express = require('express');
var router = express.Router();

/* GET regular course page. */
router.get('/', function(req, res, next) {
  res.render('admin_communicator', { title: 'MultiLingua - communicator' });
});

module.exports = router;
