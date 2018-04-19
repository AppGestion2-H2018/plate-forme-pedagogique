var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur')
//var test = require('../../../../APP/plate-form-pedagogique/src/app/utilisateurs/connecter-utilisateur');

// recheche le da de l'utilisateur pour le comparer
// router.post('/login', function (req, res, next) {
//     var reponse = '';
//     var da = req.body.da;
//     var motdepasse = req.body.motdepasse
//
//     //recheche le da de l'utilisateur dans la base de donner
//     Utilisateur.findOne({'da': da}, function (err, utilisateur) {
//         if (err) return console.error(err);
//
//         //vérifie si l'utilisateur n'est pas null
//         // if(utilisateur !== null){
//         //
//         //     if(motdepasse == motdepasse.this.motdepasse){
//         //         reponse = 'Bienvenue'
//         //     }
//         //     else{
//         //         reponse = 'le mot de passe n/est pas valide'
//         //     }
//         //
//         //     // reponse = 'Le courriel est valide';
//         //     // // Generate a token and put it to the db
//         //     // var buf = Crypto.randomBytes(20);
//         //     // var token = buf.toString('hex');
//         //     // console.log(token);
//         //     // // Send mail
//         // }
//         else{
//             reponse = 'l/utilsiateur est invalide';
//         }
//
//         console.log(reponse);
//         res.json(reponse);
//     });
// });

// Obtenir tous les Utilisateurs
router.get('/', function (req, res, next) {
    Utilisateur.find({}, {/*_id: 0, da: 1*/}, function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });
});


module.exports = router;
