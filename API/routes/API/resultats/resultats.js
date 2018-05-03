var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "35.193.78.254",
  user: "appgestion2h2018",
  password: "appgestion2h2018",
  database: "resultats",
});

router.get('/', function(req, res, next) {
  // connect to your database
    con.connect(function (err) {
    
        if (err) console.log(err);
		
		// query to the database and get the records
        var nom = con.query('SELECT * FROM evaluations', function (err, recordset) {
            
            if (err) console.log(err)
			console.log(nom);

            // send records as a response
            res.json(recordset);
            
        });
});
});

module.exports = router;
