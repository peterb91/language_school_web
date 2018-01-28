var express = require('express');
var router = express.Router();
var db = require('../models/db_connection.js');
require('./routes.js')();

// SELECT ALL REGISTERED STUDENTS
router.get('/', isLoggedIn, function(req, res, next) {
  db.query("SELECT * FROM users WHERE role='student' ORDER BY id",
    function(err, rows) {
        if (err) {
          req.flash("error", err);
          console.log("Error with SELECT * database query");
          res.render('students', { title: 'MultiLingua - students', data: '', messages: req.flash() });
        } else {
          res.render('students', { title: 'MultiLingua - students', data: rows, messages: req.flash() });
        }
    });
});

// DELETE STUDENT
router.delete('/delete/(:firstName)/(:lastName)/(:id)', function(req, res, next) {
    
    db.query('DELETE FROM users WHERE id = ' + req.params.id, function(err, result) {
            //if(err) throw err
            if (err) {
                console.log("Error with database delete query");
                req.flash('error', err);
                // redirect to students list
                res.redirect('/students');
            } else {
                console.log("User deleted successfully");
                req.flash('success', 'Student: ' + req.params.firstName + " " +req.params.lastName + ', deleted successfully!');
                // redirect to students list
                res.redirect('/students');
            }
        })
    })

module.exports = router;
