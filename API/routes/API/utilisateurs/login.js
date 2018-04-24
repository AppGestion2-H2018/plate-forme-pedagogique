var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur')


// recheche le da de l'utilisateur pour le comparer
router.post('/', function (req, res, next) {
    var reponse = '';
    var da = req.body.da;
    var motdepasse = req.body.motdepasse

    //recheche le da de l'utilisateur dans la base de donner
    Utilisateur.findOne({'da': da}, function (err, utilisateur) {
        if (err) return console.error(err);

       //// vérifie si l'utilisateur n'est pas null
        if(utilisateur !== null) {

            if(motdepasse == utilisateur.motdepasse){
                reponse = 'bienvenue';
            }
          else {
                reponse = 'mot de passe invalide';
            }

        } else
        {
            reponse = 'l/utilsiateur est invalide';
        }
        console.log(reponse);
        res.json(reponse);
    });
});

// Obtenir tous les Utilisateurs
router.get('/', function (req, res, next) {
    Utilisateur.find({}, {/*_id: 0, da: 1*/}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});


module.exports = router;
