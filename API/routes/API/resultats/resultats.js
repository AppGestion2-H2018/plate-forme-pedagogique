var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "35.193.78.254",
    user: "appgestion2h2018",
    password: "appgestion2h2018",
    database: "resultats"
});

/*
Création des routes initiales: William Houle
Ajout des routes supplémentaires: Francis Gagnon
Amélioration: Francis Gagnon
Aidé par: William Houle
*/

//Tentative de connection initiale (Pour ne pas avoir de double handshake)
con.connect(function (err) {
    if (err) console.log(err);
});

/**
 * Trouver un enseignant [Par: Francis Gagnon]
 */
router.get('/enseignant/:id', function (req, res) {
    var enseignant_id = req.params.id;
    // connect to your database

    // query to the database and get the records
    con.query('SELECT * FROM enseignants WHERE id = ?', enseignant_id, function (err, enseignant) {
        if (err) console.log(err);
        console.log(enseignant);

        if (enseignant.length === 0) {
            return res.send({"code": 0, "message": "L'enseignant #" + enseignant_id + " n'existe pas."});
        }

        // send records as a response
        res.json(enseignant);
    });
});

/**
 * Trouver les évaluations d'une grille d'évaluation [Par: Francis Gagnon]
 */
router.get('/evaluations/:id', function (req, res) {
    var grilleevaluation_id = req.params.id;

    // query to the database and get the records
    con.query('SELECT evaluations.id, evaluations.nom, commentaire, categorie.nom AS categorie, poids_evaluation FROM evaluations INNER JOIN categorie ON categorie_id = categorie.id WHERE grilleevaluation_id = ?', grilleevaluation_id, function (err, evaluations) {
        if (err) console.log(err);
        console.log(evaluations);

        if (evaluations.length === 0) {
            return res.send({"code": 0, "message": "La grille d'évaluation #" + grilleevaluation_id + " n'a pas d'évaluation."});
        }

        // send records as a response
        res.json(evaluations);
    });
});

/**
 * Trouver les grilles d'évaluations d'un profeseur selon le cours et le groupe [Par: Francis Gagnon]
 */
router.get('/grilleevaluation/:enseignant_id/:cours_id/:groupe_id', function (req, res) {
    var enseignant_id = req.params.enseignant_id;
    var cours_id = req.params.cours_id;
    var groupe_id = req.params.groupe_id;

    // query to the database and get the records
    con.query('SELECT * FROM grilleevaluation WHERE enseignant_id = ' + enseignant_id + ' AND cours_id = ' + cours_id + ' AND groupe_id = ' + groupe_id, function (err, grilleevaluation) {
        if (err) console.log(err);
        console.log(grilleevaluation);

        if (grilleevaluation.length === 0) {
            return res.send({"code": 0, "message": "Le professeur #" + enseignant_id + " n'a pas de grille d'évaluation."});
        }

        // send records as a response
        res.json(grilleevaluation);
    });
});

/**
 * Trouver les cours d'un professeur [Par: Francis Gagnon]
 */
router.get('/cours/:id', function (req, res) {
    var objectId = req.params.id;

    // query to the database and get the records
    con.query('SELECT distinct cours.id, nom FROM cours INNER JOIN grilleevaluation on cours_id = cours.id WHERE enseignant_id = ?', objectId, function (err, cours) {
        if (err) console.log(err);
        console.log(cours);

        if (cours.length === 0) {
            return res.send({"code": 0, "message": "Le professeur #" + objectId + " n'a pas de cours."});
        }
        // send records as a response
        res.json(cours);
    });
});

/**
 * Trouver les groupes d'un cours [Par: Francis Gagnon]
 */
router.get('/groupe/:id', function (req, res) {
    var objectId = req.params.id;

    // query to the database and get the records
    con.query('SELECT distinct numero, id, cours_id FROM groupe WHERE cours_id = ?', objectId, function (err, groupe) {
        if (err) console.log(err);
        console.log(groupe);

        if (groupe.length === 0) {
            return res.send({"code": 0, "message": "Le cours #" + objectId + " n'a pas de groupe."});
        }

        // send records as a response
        res.json(groupe);
    });
});

/**
 * Supprime une évaluation [Par: Francis Gagnon]
 */
router.delete('/evaluations/:id', function (req, res) {
    var evaluation_id = req.params.id;

    console.log(req.body);
    con.query('DELETE FROM evaluations WHERE id=?', evaluation_id, function (error, results) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });

});

/**
 * Ajoute une grille d'évaluation [Par: Francis Gagnon]
 */
router.post('/grilleevaluation/ajouter/:enseignant_id/:cours_id/:groupe_id', function (req, res) {
    var enseignant_id = req.params.enseignant_id;
    var cours_id = req.params.cours_id;
    var groupe_id = req.params.groupe_id;

    con.query('INSERT INTO grilleevaluation (enseignant_id, cours_id, groupe_id) VALUES (?,?,?)', enseignant_id, cours_id, groupe_id, function (error, results) {
        if (error) throw error;
        res.end('ok');
    });
});

/**
 * Ajoute une évaluation [Par: Francis Gagnon]
 */
router.post('/evaluation/', function (req, res) {
    var body = req.body.params;
    console.log(body);
    con.query('INSERT INTO evaluations (grilleevaluation_id, nom, commentaire, categorie_id, poids_evaluation) VALUES (?,?,?,?,?)', req.params.grilleevaluation_id, req.params.nom, req.params.commentaire, req.params.categorie_id, req.params.poids_evaluation, function (error, results) {
        if (error) throw error;
        res.end('ok');
    });
});

/**
 * Modification d'une évaluation [Par: William Houle]
 */
router.put('/evaluations/modifier/:id/:nom', function(req, res, next){
    con.query('UPDATE evaluations SET nom = "' + req.params.nom + '" WHERE id=' + req.params.id + ';', function(error, result, fields) {
        if (error) throw error;
        res.json(result);
    });
});

module.exports = router;


