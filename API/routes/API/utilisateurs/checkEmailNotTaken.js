var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

/**
 * Vérifie que le courriel est unique.
 */
router.post('/', function (req, res, next) {
    const utilisateurId = req.body.utilisateurId;

    Utilisateur.findOne({courriel: req.body.courriel})
        .then(utilisateur => {
            // Aucun utilisateur trouvé
            if (!utilisateur) {
                return res.json({
                    emailNotTaken: true
                });
            }

            // Valide le formulaire de modification
            if (utilisateurId) {
                if (utilisateurId === utilisateur._id.toString()) {
                    return res.json({
                        emailNotTaken: true
                    })
                } else {
                    return res.json({
                        emailNotTaken: false
                    })
                }
            }
            // Valide le formulaire de création
            else {
                res.json({
                    emailNotTaken: false
                })
            }
        })
        .catch(error => {
            res.json({
                emailNotTaken: true
            })
        });
});

module.exports = router;
