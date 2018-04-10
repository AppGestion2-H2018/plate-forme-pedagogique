var express = require('express');
var router = express.Router();

/**
 * Informations sur la base de donnée.
 */
var nomBD = 'plate-forme-pedagogique';
var collection = 'evenements';
var config = require('../../../config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = config.database.uri;
var ObjectId = require('mongodb').ObjectID;

/**
 * Voir avec Carine si ok : https://angular-material-calendar.bradb.net/
 */

/**
 * Retourne tous les événements sous format json.
 * URL : http://localhost:3000/api/evenements
 * Voir le use (à la ligne 33 pour l'instant) du fichier 'app.js'.
 */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function (erreur, client) {
        assert.equal(null, erreur);
        console.log("Connexion au serveur réussie");
        const db = client.db(nomBD);

        db.collection(collection).find().toArray(function (erreur, resultat) {
            if (erreur) return console.log(erreur)
            console.log(resultat);
            res.json(resultat)
        })

        client.close();
    });
});

/**
 * Retourne un événement sous format json.
 * URL : http://localhost:3000/api/evenements/:evenementId
 */
router.get('/:evenementId', function (req, res, next) {
    var evenementId = req.params.evenementId;
    MongoClient.connect(url, function (erreur, client) {
        assert.equal(null, erreur);
        console.log("Connexion au serveur réussie");
        const db = client.db(nomBD);

        db.collection(collection).findOne({_id: ObjectId.createFromHexString(evenementId)}, function (err, resultat) {
            if (erreur) return console.log(erreur)
            console.log(resultat);
            res.json(resultat)
        })

        client.close();
    });
});
module.exports = router;
