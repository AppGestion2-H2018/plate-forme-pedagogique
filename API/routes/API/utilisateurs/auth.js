var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');


// Test pour voir que ça fonctionne, à supprimer
router.get('/', function (req, res, next) {
    res.send('Information sur l\'utilisateur');
});

// Obtenir tous les Utilisateurs
router.get('/all', function (req, res, next) {
    Utilisateur.find(function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});

// Retrouver un utilisateur avec son DA
router.get('/:da', function (req, res, next) {
    Utilisateur.find({'da': req.params.da}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});

// Ajouter un nouvelle utilisateur
router.post('/ajouter', function (req, res, next) {
    var infoUtilisateur = {
        da: 1234567,
        nom: "Parent",
        prenom: "Claude",
        courriel: "parent.claude@carrefour.cegepvicto.ca",
        datedenaissance: "1999-01-01",
        codepermanent: "PARC01019905",
        programme: 2,
        sexe: "masculin",
        role: 2,
        motdepasse: "qwerty123",
        photo: ""
    };
    var utilisateur = new Utilisateur(infoUtilisateur);

    utilisateur.save(function (err, utilisateurFinal) {
        if (err) return console.error(err);
        res.json(utilisateurFinal);
    });

    res.send("Une erreur est survenue...");
});

module.exports = router;
