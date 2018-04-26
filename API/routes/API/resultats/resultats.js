var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app2notes",
});

router.get('/', function(req, res, next) {
  // connect to your database
    con.connect(function (err) {
    
        if (err) console.log(err);
		
		// query to the database and get the records
        var nom = con.query('SELECT * FROM evaluation', function (err, recordset) {
            
            if (err) console.log(err)
			console.log(nom);

            // send records as a response
            res.send(recordset);
            
        });
});
});

module.exports = router;
