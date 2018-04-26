var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');


/**
 * Créer un utilisateur
 */
router.post('/', function (req, res, next) {
    var utilisateur = new Utilisateur(req.body);
    utilisateur.save(function (err, utilisateurFinal) {
        if (err) return res.send(err);
        res.json(utilisateurFinal);
    });
});

module.exports = router;
