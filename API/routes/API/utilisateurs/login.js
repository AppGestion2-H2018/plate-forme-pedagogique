var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');
var auth = require('./auth');

// recheche le da de l'utilisateur pour le comparer
router.post('/', function (req, res, next) {
    var reponse = '';
    var da = req.body.da;
    var motdepasse = req.body.motdepasse;
    var objReponse = {'Code':0,'Message':''};


    //recheche le da de l'utilisateur dans la base de donner
    Utilisateur.findOne({'da': da}, function (err, utilisateur) {
        if (err) return console.error(err);

        //mathieu cette partie permet de hash un mot de passe //todo
        //Ainsi tu peut hash un mot de passe ou autre et après introduire dans la base de donner
       // bcrypt.genSalt(saltRounds, function (err, salt) {
          //  bcrypt.hash(motdepasse, salt, function (err, hash) {// le hash est la réponse de l'encryption du mot de passe juste avant
             //   console.log(hash);
                if (motdepasse == utilisateur.motdepasse) {

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
   // });
//});
// Obtenir tous les Utilisateurs
router.get('/', function (req, res, next) {
    Utilisateur.find({}, {/*_id: 0, da: 1*/}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});


module.exports = router;
