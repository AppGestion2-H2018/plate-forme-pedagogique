var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');
var Crypto = require('crypto');
var nodemailer = require('nodemailer');

// Envoie d'un courriel de reinitialisation si l'adresse courriel est valider
router.post('/sendmail', function (req, res, next) {
  var objReponse = {'Code' : 0, 'Message':'Un erreur non géré est survenu'};
  var email = req.body.email;

  Utilisateur.findOne({'courriel': email}, function (err, utilisateur) {
      if (err) return console.error(err);

      if(utilisateur !== null){
          console.log('Le courriel est valide');

          // Generate a token
          var buf = Crypto.randomBytes(20);
          var token = buf.toString('hex');
          // The token expire after 1 hour
          var passwordExpires = new Date();
          passwordExpires.setHours(passwordExpires.getHours()+1);
          console.log('Token : ' + token + ' Expiration : ' + passwordExpires);

          // Save token and expiration date
          utilisateur.set({ resetPasswordToken: token, resetPasswordExpires: passwordExpires});
          utilisateur.save(function (err, updatedUtilisateur){
            if (err) return console.error(err);

            // Send mail

          });
          console.log('Token sauvegardé dans la bd');
          reponse = 'Token généré';

      }
      else{
          objReponse = {'Code' : 1, 'Message':'Le courriel n\'est pas présent dans la bd'};
      }

      console.log('Réponse : ' + objReponse);
      res.json(objReponse);
  });
});

// Modification du mot de passe
router.patch('/:id', function(req, res, next){
  var idUser = req.params.id;

  // TODO : save password in db
});

module.exports = router;
