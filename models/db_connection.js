var mysql = require('mysql');

var db = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'ml_school'
    });
    
// Database setup
db.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
    db.query('CREATE DATABASE IF NOT EXISTS ml_school', function (err, result) {
    if (err) throw err;
    console.log("Database ml_school created...");
    });
    db.query('USE ml_school', function (err, result) {
        if (err) throw err;
        console.log("Database changed to ml_school");
    });
    db.query('CREATE TABLE IF NOT EXISTS students \
    (id INT  NOT NULL AUTO_INCREMENT, \
    PRIMARY KEY(id), \
    firstName VARCHAR(50), \
    lastName VARCHAR(50), \
    email VARCHAR(120) UNIQUE, \
    password VARCHAR(255), \
    language VARCHAR(30), \
    level VARCHAR(2), \
    status VARCHAR(10) DEFAULT "accepted")', 
    function (err, result) {
        if (err) throw err;
        console.log("Table students created...");
    });
    //db.end();
});

module.exports = db;