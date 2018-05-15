 var express = require('express');
var router = express.Router();

// Récupération et réinitialisation du mot de passe
router.use('/recuperation', require('./motdepasse'));
router.use('/auth', require('./auth'));
router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/update', require('./update'));
router.use('/checkEmailNotTaken', require('./checkEmailNotTaken'));
router.use('/getone', require('./getone'));

router.get('/', function(req, res, next) {
  //res.send('api Utilisateurs');
    res.redirect('/api/utilisateurs/auth/all')
});

module.exports = router;
