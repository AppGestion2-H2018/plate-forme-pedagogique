/**
 * Informations sur la base de donnée.
 */
var dbName = 'plate-forme-pedagogique';
var collection = 'publication';
var config = require('../../../config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = config.database.uri;
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(dbName);
        var sort = {date_publication: -1};
        var requete = {_id: 0, auteur: 1, date_publication: 1, date_remise: 1, titre: 1, contenu: 1, tags: 1, commentaire: 1, fichier: 1};
        db.collection(collection).find({}, requete).sort(sort).limit(5).toArray(function(err, result) {
            if (err) return console.log(err)
            console.log(result);
            res.json(result);
        })

        client.close();
    });
});

router.get('/date-de-remise', function(req, res, next) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connexion yeaaaaah!");
        const db = client.db(dbName);
        var sort = {date_remise: -1};
        var requete = {_id: 0, auteur: 1, date_publication: -1, date_remise: 1, titre: 1, contenu: 1, tags: 1, commentaire: 1, fichier: 1};
        db.collection(collection).find({}, requete).sort(sort).limit(5).toArray(function(err, result) {
            if (err) return console.log(err)
            console.log(result);
            res.json(result);
        })

        client.close();
    });
});

router.get('/:id', function(req, res, next){
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(dbName);
        db.collection(collection).findOne({_id: ObjectId.createFromHexString(req.params.id)}, function(err, result) {
            if (err) return console.log(err)
            console.log(result);
            res.json(result);
        })

        client.close();
    });
});

router.post('/ajouter', function(req, res, next){
    var post = req.body;
    console.log(post);
    if(false) {
        res.status(400);
        res.json({"erreur" : "Données incorrectes"});
    } else {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(dbName);
            db.collection(collection).insertOne(post, function(err, result) {
                if (err) return console.log(err)
                console.log("Objet ajouté");
                res.json(result);
            });
            client.close();
        });
    }
});

router.delete('/supprimer/:id', function(req, res, next){
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(dbName);
        db.collection(collection).deleteOne({_id: ObjectId.createFromHexString(req.params.id)}, function(err, result) {
            if (err) return console.log(err)
            console.log("Publication supprimé");
            res.json(result);
        })

        client.close();
    });
});

router.put('/modifier/:id', function(req, res, next){
    var task = req.body;
    if(false) {
        res.status(400);
        res.json({"erreur" : "Données incorrectes"});
    } else {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(dbName);
            db.collection(collection).updateOne({_id: ObjectId.createFromHexString(req.params.id)}, {$set : task}, function(err, result) {
                if (err) return console.log(err)
                console.log("objet mis à jour");
                res.json(result);
            })

            client.close();
        });
    }
});

module.exports = router;
