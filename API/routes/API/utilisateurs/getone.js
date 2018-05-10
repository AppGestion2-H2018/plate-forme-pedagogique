var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

/**
 * Trouve un utilisateur par son id.
 */
router.post('/', function (req, res, next) {
    Utilisateur.findOne({_id: req.body._id}, {}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});

module.exports = router;
