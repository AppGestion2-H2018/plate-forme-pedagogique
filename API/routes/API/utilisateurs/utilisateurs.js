var express = require('express');
var router = express.Router();
// Récupération et réinitialisation du mot de passe
require('motdepasse');

router.get('/', function(req, res, next) {
  res.send('api Utilisateurs');
});

module.exports = router;
