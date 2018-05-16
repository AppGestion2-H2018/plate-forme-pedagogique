var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');
var auth = require('./auth');

// recheche le da de l'utilisateur pour le comparer
router.post('/', function (req, res, next) {
    var reponse = '';
    var da = req.body.da;
    var motdepasse = req.body.motdepasse;
    //varaible qui son utiliser pour encrypter les mots de passe
    var objReponse = {'Code':0,'Message':''};
    var bcrypt = require('bcrypt');
    const saltRounds = 10;

    //recheche le da de l'utilisateur dans la base de donner
    Utilisateur.findOne({'da': da}, function (err, utilisateur) {
        if (err) return console.error(err);


        //Ainsi tu peut hash un mot de passe ou autre et après introduire dans la base de donner
       bcrypt.genSalt(saltRounds, function (err, salt) {
           bcrypt.hash(motdepasse, salt, function (err, hash) {// le hash est la réponse de l'encryption du mot de passe juste avant
              console.log(hash);
                  //compare avec les la base de donner le mots de passe en encryptant de nouveau
               bcrypt.compare(motdepasse, hash).then(function(value1) {
                  console.log(value1);
                   bcrypt.compare(utilisateur.motdepasse, hash).then(function(value2) {

               console.log(value2);
                if (value2 == true && value1 == true  ) {

                    objReponse = {'Code': 1, 'Message': 'La connexion à été effectuée avec succès.'};
                    GestionCompleteDesNouveauxLogin(req, res, da).then(function (multiResultat) {
                        res = multiResultat[0];

                        if (multiResultat[1] === false) {
                            console.error("Une erreur est survenue lors de l'ajout des cookies. Abandonnez la mission!");
                            objReponse = {
                                'Code': 3,
                                'Message': 'Une erreur interne est survenue, veuillez réessayer plus tard. '
                            };
                        }

                        console.log(objReponse);
                        res.json(objReponse);
                    });
                }
                else {
                    objReponse = {'Code': 2, 'Message': 'Le numéro de DA ou le mot de passe n\'est pas valide.'};
                    console.log(objReponse);
                    res.json(objReponse);
                }
   });
 });
    });
            });
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
