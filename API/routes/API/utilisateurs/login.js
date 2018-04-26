var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur')


// recheche le da de l'utilisateur pour le comparer
router.post('/', function (req, res, next) {
    var reponse = '';
    var da = req.body.da;
    var motdepasse = req.body.motdepasse
    var objReponse = {'Code':0,'Message':''}


    //recheche le da de l'utilisateur dans la base de donner
    Utilisateur.findOne({'da': da}, function (err, utilisateur) {
        if (err) return console.error(err);

       //// vérifie si l'utilisateur n'est pas null
        if(utilisateur !== null) {

            if(motdepasse == utilisateur.motdepasse){
               objReponse = {'Code':1,'Message':'La connexion à été effectué avec succès.'}
            }
          else {
                objReponse = {'Code':2,'Message':'Le numéro de DA ou le mot de passe n\'est pas valide.'}
            }

        } else
        {
            objReponse = {'Code':3,'Message':'Une erreur interne est survenue, veuillez réessayer plus tard. '}
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
