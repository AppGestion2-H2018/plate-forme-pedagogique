var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');
var Crypto = require('crypto');


// Envoie d'un courriel de reinitialisation si l'adresse courriel est valider
router.post('/sendmail', function (req, res, next) {
  var reponse = '';
  var email = req.body.email;

  Utilisateur.findOne({'courriel': email}, function (err, utilisateur) {
      if (err) return console.error(err);

      if(utilisateur !== null){
          reponse = 'Le courriel est valide';
          // Generate a token and put it to the db
          var buf = Crypto.randomBytes(20);
          var token = buf.toString('hex');
          console.log(token);
          // Send mail
      }
      else{
          reponse = 'Le courriel est invalide';
      }

      console.log(reponse);
      res.json(reponse);
  });
});

// Modification du mot de passe
router.patch('/:id', function(req, res, next){
  var idUser = req.params.id;

  // TODO : save password in db
});

module.exports = router;
