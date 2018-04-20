var express = require('express');
var router = express.Router();
var Evenement = require('../../../models/evenement');

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
 * Retourne tous les événements sous format json.
 * URL : http://localhost:3000/api/evenements
 * Philip Drouin
 */
router.get('/', function (req, res, next) {
    Evenement.find(function (err, evenement){
        if (err) return handleError(err, query);
        res.json(evenement);
    });
});

/**
 * Retourne un événement sous format json.
 * URL : http://localhost:3000/api/evenements/:evenementId
 * Philip Drouin
 */
router.get('/:id', function (req, res, next) {
    var objectId = req.params.id;
    Evenement.findById(objectId,function(err,evenement){
        if (err) return res.status(500).send(err);
        return res.send(evenement);
    });
});

/**
 * Retourne un événement sous format json selon le id d'un groupe.
 * URL : http://localhost:3000/api/evenements/:evenementId
 * Philip Drouin
 */
router.get('/groupe/:id', function (req, res, next) {
    var groupeId = req.params.id;
    Evenement.find({ 'group_id' : groupeId },function(err,evenement){
        if (err) return res.status(500).send(err);
        return res.send(evenement);
    });
});

/**
 * Retourne un événement sous format json selon le id d'un utilisateur.
 * URL : http://localhost:3000/api/evenements/:evenementId
 * Philip Drouin
 */
router.get('/admin/:id', function (req, res, next) {
    var adminId = req.params.id;
    Evenement.find({ 'admin_id' : adminId },function(err,evenement){
        if (err) return res.status(500).send(err);
        return res.send(evenement);
    });
});

/**
 * Ajoute un événement sous format json.
 * URL : http://localhost:3000/api/evenements/ajout
 */
router.post('/ajout', function(req, res, next){
    var evenement = req.body;
    console.log(evenement);
    if(!evenement.text || (!evenement.description) || (!evenement.categorie)|| (!evenement.start_date)|| (!evenement.end_date)|| (!evenement.type)||(!evenement.creation_date)||(!evenement.admin_id) ||  (!evenement.group_id)|| (!evenement.active)) {
        res.status(400);
        res.json({"erreur" : "Données incorrectes"});
    } else {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(nomBD);
            db.collection('evenements').insertOne(evenement, function(err, result) {
                if (err) return console.log(err)
                console.log("Évènement ajouté");
                res.json(result);
            })
            client.close();
        });
    }
});

module.exports = router;
