let express = require('express');
let router = express.Router();

let mysql = require('mysql');

let con = mysql.createConnection({
    host: "35.193.78.254",
    user: "appgestion2h2018",
    password: "appgestion2h2018",
    database: "resultats"
});

//Tentative de connection initiale (Pour empècher le double handshake)
con.connect(function (err) {
    if (err) console.log(err);
});

/**
 * Trouver un enseignant
 */
router.get('/enseignant/:id', function (req, res) {
    let enseignant_id = req.params.id;
    // connect to your database

    // query to the database and get the records
    con.query('SELECT * FROM enseignants WHERE id = ' + enseignant_id, function (err, enseignant) {
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
 * Trouver les évaluations d'une grille d'évaluation
 */
router.get('/evaluations/:id', function (req, res) {
    let grilleevaluation_id = req.params.id;

    // query to the database and get the records
    con.query('SELECT * FROM evaluations WHERE grilleevaluation_id = ' + grilleevaluation_id, function (err, evaluations) {
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
 * Trouver les grilles d'évaluations d'un profeseur selon le cours et le groupe
 */
router.get('/grilleevaluation/:enseignant_id/:cours_id/:groupe_id', function (req, res) {
    let enseignant_id = req.params.enseignant_id;
    let cours_id = req.params.cours_id;
    let groupe_id = req.params.groupe_id;

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
 * Trouver les cours d'un professeur
 */
router.get('/cours/:id', function (req, res) {
    let objectId = req.params.id;

    // query to the database and get the records
    con.query('SELECT distinct cours.id, nom FROM cours INNER JOIN grilleevaluation on cours_id = cours.id WHERE enseignant_id = ' + objectId, function (err, cours) {
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
 * Trouver les groupes d'un cours
 */
router.get('/groupe/:id', function (req, res) {
    let objectId = req.params.id;

    // query to the database and get the records
    con.query('SELECT distinct numero, id, cours_id FROM groupe WHERE cours_id = ' + objectId, function (err, groupe) {
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
 * Supprime une évaluation
 */
router.delete('/evaluations/:id', function (req, res, next) {
    let evaluation_id = req.params.id;

    console.log(req.body);
    con.query('DELETE FROM evaluations WHERE id=' + evaluation_id, function (error) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });

});

/**
 * Ajoute une grille d'évaluation
 */
router.post('/grilleevaluation/:enseignant_id/:cours_id/:groupe_id', function (req, res, next) {
    let enseignant_id = req.params.enseignant_id;
    let cours_id = req.params.cours_id;
    let groupe_id = req.params.groupe_id;

    console.log(req.body);
    con.query('INSERT INTO grilleevaluation (enseignant_id, cours_id, groupe_id) VALUES ('+ enseignant_id + ',' + cours_id + ',' + groupe_id + ')', function (error) {
        if (error) throw error;
        res.end('La grille d\'évaluation à été ajouter!');
    });
});

module.exports = router;


