var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');

// Envoie d'un courriel de reinitialisation si l'adresse courriel est valider
router.post('/sendmail', function (req, res, next) {
  var email = req.body.email;

  Utilisateur.find({'courriel': email}, function (err, utilisateur) {
      if (err) return console.error(err);
      res.json(utilisateur);
  });

  res.send('Le courriel est invalide');
});

// Test pour voir que ça fonctionne, à supprimer
router.get('/', function(req, res, next) {
  res.send('Récupération du mot de passe');
});

// Modification du mot de passe
router.patch('/:id', function(req, res, next){
  var idUser = req.params.id;

  // TODO : save password in db
});

module.exports = router;
