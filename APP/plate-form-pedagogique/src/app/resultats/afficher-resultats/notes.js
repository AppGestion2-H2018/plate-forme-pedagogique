//var builder = require('mongo-sql');
// 
//var usersQuery = {
//  type: 'select'
//, table: 'classes'
//, where: { id: $etudiant_identifiant}
// 
//var result = builder.sql(usersQuery);
// 
//result.values     // Array of values
//result.toString() // Sql string value

var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app2notes",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/**
 * Affiche la moyenne, la mediane et l'ecart-type pour l'etudiant connecte
 * URL : http://localhost:3000/api/notes
 */
router.get('/', function(req, res, next) {
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
		
		// query to the database and get the records
        var nom = request.query('SELECT nom FROM evaluation);', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
           
        // query to the database and get the records
        var moyenne = request.query('SELECT AVG(total) FROM (SELECT SUM(pts) AS total FROM evaluation INNER JOIN etudiant_evaluation ON evaluation.id = evaluation_id WHERE cours_id = ($cours_id) AND etudiant_id = $etudiant_id);', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
		
		var mediane = request.query('', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
		
		var ecartype = request.query('SELECT STD(pts) FROM evaluation WHERE cours_id = $cours_id;', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
		
    });
});
});

router.get('/', function(req, res, next) {
  //res.send('api Résultats scolaires');
});

module.exports = router;
