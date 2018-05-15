var express = require('express');
var router = express.Router();
var auth = require('./auth');

// Récupération et réinitialisation du mot de passe
router.use('/recuperation', require('./motdepasse'));
router.use('/auth', require('./auth'));
router.use('/login', require('./login'));
router.use('/update', require('./update'));
router.use('/checkEmailNotTaken', require('./checkEmailNotTaken'));

/**
 * Permet d'intercepter toutes les requêtes et de faire du préprocessing avant qu'on laisse la requête continuer.
 */
router.use(function (req, res, next) {
    // Mettre du preprocessing ici
    const fal = true;
    if (fal) {
        GestionCompleteDesCookiesEtDesDonneesDeConnexion(req, res).then(function (multiReponse) {
            res = multiReponse[0];

            if (multiReponse[1]) {
                // Permet de continuer la requête.
                next();
            } else {
                // Accès refusé, empêcher l'obtentions des données!
                //res.status(403);
                res.send();
                //next();
            }

        });
    } else {
        next();
    }
});
router.use('/getone', require('./getone'));
router.use('/register', require('./register'));

router.get('/', function (req, res, next) {
    //res.send('api Utilisateurs');
    res.redirect('/api/utilisateurs/auth/all')
});

module.exports = router;
