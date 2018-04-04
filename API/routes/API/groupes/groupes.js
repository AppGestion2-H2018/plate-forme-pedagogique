/**
 * Module de routes API créé par Jean-Sébastien Lemelin
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connexion au serveur réussie");
      const db = client.db(dbName);

      db.collection('produits').find().toArray(function(err, result) {
          if (err) return console.log(err)
          console.log(result);
          res.json(result)
      })

      client.close();
  });
});



module.exports = router;
