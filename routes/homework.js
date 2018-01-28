var express = require('express');
var router = express.Router();
var db = require('../models/db_connection.js');
require('./routes.js')();

/* GET regular course page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('homework', { title: 'MultiLingua - homework', user: req.user, messages: req.flash() });
});

router.post('/upload/(:firstName)/(:lastName)', isLoggedIn, function(req, res, next) {
  var student = {
    "firstName": req.params.firstName,
    "lastName": req.params.lastName
  }
  console.log("#############################" + req.files.sampleFile.name);
  if (!req.files) {
    console.log("No files were uploaded");
    req.flash("error", "No file selected to upload");
    res.render('homework', { title: 'MultiLingua - homework', messages: req.flash(), user: req.user });
  } else {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
    var myFile = new Buffer.concat(sampleFile);
    var insertQuery = "INSERT INTO files (firstName, lastName, file) VALUES (?,?,?)";

    db.query(insertQuery, [student.firstName, student.lastName, myFile],
      function(err, rows) {
        if (err) {
          console.log(err);
          throw err
        } else {
          console.log("New record inserted to table files");
          req.flash("success", "Your file has been uploaded")
          res.render('homework', { title: 'MultiLingua - homework', messages: req.flash(), user: req.user });
        }
      });
  /*
  // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  }); 
  */
  // res.render('files', { title: 'MultiLingua - supporting files' });
  }
});

module.exports = router;
