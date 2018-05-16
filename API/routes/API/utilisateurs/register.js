var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

/* **************************************************

Les codes d'erreurs:
9 : Erreur non gérée
2 : Information manquante ou n'est pas unique dans la base de données
1 : L'enregistrement s'est effectuée avec succès

************************************************** */

/**
 * Créer un utilisateur
 */
router.post('/', function (req, res, next) {
    console.info("TEST");
    var objReponse;
    var codeErreur = 9;
    var message = "";
    var bcrypt = require('bcrypt');
    const saltRounds = 10;
    var nouvelUtilisateur = new Utilisateur(req.body);

    // *******************************************************
    // ***************** CHAMPS OBLIGATOIRES *****************
    // *******************************************************

    // Validation du DA
    if (!nouvelUtilisateur.da) {
        codeErreur = 2;
        message += "L'utilisateur doit avoir un numéro de DA. ";
    }

    // Validation du nom
    if (!nouvelUtilisateur.nom) {
        codeErreur = 2;
        message += "Le nom est obligatoire. ";
    }

    // Validation du prénom
    if (!nouvelUtilisateur.prenom) {
        codeErreur = 2;
        message += "Le prénom est obligatoire. ";
    }

    // Validation du courriel
    if (!nouvelUtilisateur.courriel) {
        codeErreur = 2;
        message += "Le courriel est obligatoire. ";
    }

    // Validation de la date de naissance
    if (!nouvelUtilisateur.datedenaissance) {
        codeErreur = 2;
        message += "La date de naissance est obligatoire. ";
    }

    // Validation du code permanent
    if (!nouvelUtilisateur.codepermanent) {
        codeErreur = 2;
        message += "Le code permanent est obligatoire. ";
    }

    // Validation du sexe
    if (!nouvelUtilisateur.sexe) {
        codeErreur = 2;
        message += "Le sexe est obligatoire. ";
    }

    // Validation du mot de passe
    if (!nouvelUtilisateur.motdepasse) {
        codeErreur = 2;
        message += "Le mot de passe est obligatoire. ";
    }

    // ********************************************************
    // ******************** CHAMPS UNIQUES ********************
    // ********************************************************
    Utilisateur.find({$or: [{'da': nouvelUtilisateur.da}, {'courriel': nouvelUtilisateur.courriel}, {'codepermanent': nouvelUtilisateur.codepermanent}]}, function (err, utilisateursBD) {
        if (err) return console.error(err);


        utilisateursBD.forEach(function (utilisateurBD) {
            // Validation du DA
            if (nouvelUtilisateur.da && nouvelUtilisateur.da === utilisateurBD.da) {
                codeErreur = 2;
                message += "Le numéro de DA est déjà utilisé. ";
            }

            // Validation du courriel
            if (nouvelUtilisateur.courriel && nouvelUtilisateur.courriel === utilisateurBD.courriel) {
                codeErreur = 2;
                message += "Le courriel est déjà utilisé. ";
            }

            // Validation du code permanent
            if (nouvelUtilisateur.codepermanent && nouvelUtilisateur.codepermanent === utilisateurBD.codepermanent) {
                codeErreur = 2;
                message += "Le code permanent est déjà utilisé. ";
            }
        });

        // ********************************************************
        // ************************ RÉPONSE ***********************
        // ********************************************************


        if (message === "") {

            // //fonction pour encrypter en bycrypt
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(nouvelUtilisateur.motdepasse, salt, function (err, hash) {
                    //le mot de passe encrypter du nouvelle utilisateur
                    nouvelUtilisateur.motdepasse = hash;
                    console.log(nouvelUtilisateur.motdepasse);

                });
            });

                nouvelUtilisateur.save(function (err) {
                if (err) return res.send(err);

                codeErreur = 1;
                message = "L'enregistrement a été effectué avec succès.";
                objReponse = {'Code': codeErreur, 'Message': message};
                res.json(objReponse);
            });
        } else {
            objReponse = {'Code': codeErreur, 'Message': message};
            res.json(objReponse);
        }
    });
});

module.exports = router;
