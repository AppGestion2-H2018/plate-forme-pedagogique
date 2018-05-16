/**
 * Informations sur la base de donnée.
 */
var dbName = 'plate-forme-pedagogique';
var collection = 'bibliotheques';
var config = require('../../../config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = config.database.uri;
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var router = express.Router();

/**
 * Retourne toutes les tablettes
 * URL : http://localhost:3000/api/bibliotheque/
 */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connexion au serveur réussie");
    const db = client.db(dbName);

    db.collection(collection).find().toArray(function(err, result) {
      if (err) return console.log(err)
        console.log(result);
      res.json(result);
      });
      client.close();
    });
});

/**
 * Ajoute une tablette sous format json.
 * URL : http://localhost:3000/api/bibliotheque/ajouter
 */
router.post('/ajouter', function(req, res, next){
    var tablette = req.body;
    console.log(tablette);
    if (!tablette.nom) {
        res.status(400);
        res.json({"erreur": "Données incorrectes"});
    } else {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie.");
            const db = client.db(dbName);

            db.collection(collection).insertOne(tablette, function (err, result) {
                if (err) return console.log(err)
                console.log("Objet ajouté");
                res.json(result);
            })
            client.close();
        });
    }
});

/**
 * Ajoute un livre à une tablette
 * URL : http://localhost:3000/api/bibliotheque/tablette/:id
 */
router.put('/tablette/:id', function(req, res, next){
    var livre = req.body;
    console.log(livre.volumeInfo.title);
    if(!livre.id) {
        res.status(400);
        res.json({"erreur" : "Données incorrectes"});
    } else {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connexion au serveur réussie");
            const db = client.db(dbName);
            db.collection(collection).updateOne({_id: ObjectId.createFromHexString(req.params.id)}, {$set : livre}, function(err, result) {
                if (err) return console.log(err)
                console.log("Tablette mis à jour");
                res.json(result);
            })

            client.close();
        });
    }
});

/**
 * Supprime une tablette ***NON UTILISÉE***
 * URL : http://localhost:3000/api/bibliotheque/ajouter
 */
router.delete('/task/:id', function(req, res, next){
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connexion au serveur réussie");
        const db = client.db(dbName);
        db.collection('tasks').deleteOne({_id: ObjectId.createFromHexString(req.params.id)}, function(err, result) {
            if (err) return console.log(err)
            console.log("Produit supprimé");
            res.json(result);
        })
        client.close();
    });
});

module.exports = router;
