var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

router.put('/:utilisateurId', function (req, res, next) {
    Utilisateur.updateOne({_id: req.params.utilisateurId}, {$set : req.body}, function(err, result) {
        if (err) return console.log(err)
        console.log("Utilisateur mis à jour");
        res.json(result);
    })
});

module.exports = router;
