var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var con = mysql.createConnection(,{
  host: "35.193.78.254",
  user: "appgestion2h2018",
  password: "appgestion2h2018",
  database: "resultats",
});

router.get('/evaluations', function(req, res, next) {
  // connect to your database
    con.connect(function (err) {
    
        if (err) console.log(err);
		
		// query to the database and get the records
        con.query('SELECT * FROM evaluations', function (err, evaluations) {            
            if (err) console.log(err)
			console.log(evaluations);

            // send records as a response
            res.json(evaluations);
            
        });
		
	});
});

router.get('/notes', function(req, res, next) {
  // connect to your database
    con.connect(function (err) {
    
        if (err) console.log(err);
		
		con.query('SELECT total FROM (SELECT AVG(note) AS total FROM notes INNER JOIN evaluations ON evaluations.id = notes.evaluation_id INNER JOIN etudiants ON notes.etudiant_id = etudiants.id INNER JOIN grilleevaluation ON grilleevaluation.id = grilleevaluation_id WHERE groupe_id = 1) as total);', function (err, notes) {
            
            if (err) console.log(err)
				console.log(notes);
        
            // send records as a response
            res.json(notes);
            
        });
		
	});
});

module.exports = router;
