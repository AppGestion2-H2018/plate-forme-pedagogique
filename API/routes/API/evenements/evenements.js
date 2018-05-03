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
router.get('/', function (req, res, next) {
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

/**
 * Retourne les événements d'un groupe sous format json.
 * URL : http://localhost:3000/api/evenements/groupe/:groupeId
 */
router.get('/groupe/:groupeId', function (req, res, next) {
    var groupe_id = req.params.groupeId;
    console.log(groupe_id);
    MongoClient.connect(url, function (erreur, client) {
        assert.equal(null, erreur);
        console.log("Connexion au serveur réussie");
        const db = client.db(nomBD);

        db.collection(collection).find({"group_id": groupe_id}).toArray(function (err, resultat) {
            if (erreur) return console.log(erreur)
            console.log(resultat);
            res.json(resultat)
        })

        client.close();
    });
});

/**
 * Retourne les événements d'un utilisateur sous format json.
 * URL : http://localhost:3000/api/evenements/admin/:adminId
 */
router.get('/admin/:adminId', function (req, res, next) {
    var adminId = req.params.adminId;
    console.log(adminId);
    MongoClient.connect(url, function (erreur, client) {
        assert.equal(null, erreur);
        console.log("Connexion au serveur réussie");
        const db = client.db(nomBD);

        db.collection(collection).find({"admin_id": adminId}).toArray(function (err, resultat) {
            if (erreur) return console.log(erreur)
            console.log(resultat);
            res.json(resultat)
        })

        client.close();
    });
});


/**
 * Supprime un evenement par son id
 */
router.delete('/:evenementId', function (req, res, next) {
    var evenementId = req.params.evenementId;
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(nomBD);

        db.collection(collection).deleteOne({_id: ObjectId.createFromHexString(evenementId)}, function (err, result) {
            if (err) return console.log(err)
            console.log("Évènement supprimé");
            res.json(result);
        })

        client.close();
    });
});
/**
 * Modifier un evenement par son id
 */
router.put('/:evenementId', function (req, res, next) {
    console.log("Mise à jour de l'événement")
    var evenement = req.body;
    var evenementId = req.params.evenementId;
    console.log(evenement);
    console.log("evenementId : " + evenement);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(nomBD);
        db.collection('evenements').updateOne({_id: ObjectId.createFromHexString(evenementId)}, {$set: evenement}, function (err, result) {
            if (err) return console.log(err)
            console.log("Évènement mis à jour");
            res.json(result);
        })

        client.close();
    });
});


/**
 * Ajoute un événement sous format json.
 * URL : http://localhost:3000/api/evenements/ajout
 */
router.post('/ajout', function (req, res, next) {
    var evenement = req.body;
    console.log(evenement);
    if (!evenement.text || (!evenement.description) || (!evenement.categorie) || (!evenement.start_date) || (!evenement.end_date) || (!evenement.type) || (!evenement.admin_id) || (!evenement.active)) {
        res.status(400);
        res.json({"erreur": "Données incorrectes"});
    } else {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(nomBD);
            db.collection(collection).insertOne(evenement, function (err, result) {
                if (err) return console.log(err)
                console.log("Évènement ajouté");
                res.json(result);
            })
            client.close();
        });
    }
});

/**
 * Ajoute un événement sous format json.
 * URL : http://localhost:3000/api/evenements/ajout
 */
router.post('/ajout', function (req, res, next) {
    var evenement = req.body;
    console.log(evenement);
    if (!evenement.text || (!evenement.description) || (!evenement.categorie) || (!evenement.start_date) || (!evenement.end_date) || (!evenement.type) || (!evenement.admin_id) || (!evenement.active)) {
        res.status(400);
        res.json({"erreur": "Données incorrectes"});
    } else {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(nomBD);
            db.collection(collection).insertOne(evenement, function (err, result) {
                if (err) return console.log(err)
                console.log("Évènement ajouté");
                res.json(result);
            })
            client.close();
        });
    }
});


module.exports = router;
