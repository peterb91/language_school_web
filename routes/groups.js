var express = require('express');
var router = express.Router();
var db = require('../models/db_connection.js');
require('./routes.js')();

// SELECT ALL REGISTERED STUDENTS
router.get('/(:language)/(:level)', isLoggedIn, function(req, res, next) {
    var group = {
        "language": req.params.language,
        "level": req.params.level
    }
    db.query("SELECT * FROM users WHERE role='student' AND language=? AND level=? ORDER BY id", [group.language, group.level], 
    function(err, rows) {
        if (err) {
            req.flash("error", err);
            console.log("Error with SELECT * database query");
            res.render('groups', { title: 'MultiLingua - groups', data: '', messages: req.flash(), group: group });
        } else {
            res.render('groups', { title: 'MultiLingua - groups', data: rows, messages: req.flash(), group: group });
        }
    });
});

// DELETE STUDENT
router.delete('/(:language)/(:level)/(:id)', function(req, res, next) {
    var group = {
        "language": req.params.language,
        "level": req.params.level
    }

    db.query('DELETE FROM users WHERE id = ' + req.params.id, function(err, result) {
            //if(err) throw err
            if (err) {
                console.log("Error with database delete query");
                req.flash('error', err);
                // redirect to students list
                res.redirect('/groups/'+group.language+'/'+group.level);
            } else {
                console.log("User deleted successfully");
                req.flash('success', 'Student with id= ' + req.params.id + ' deleted successfully!');
                // redirect to students list
                res.redirect('/groups/'+group.language+'/'+group.level);
            }
        })
    })

module.exports = router;
