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

/* Add tasks. */
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

/* Delete tasks. */
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
