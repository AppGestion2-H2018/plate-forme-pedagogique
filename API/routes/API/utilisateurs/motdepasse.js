var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');
var Crypto = require('crypto');
var nodemailer = require('nodemailer');
const URL_RESET = 'http://localhost:4200/motdepasse-reinitialisation/';

// Envoie d'un courriel de reinitialisation si l'adresse courriel est valider
router.post('/sendmail', function (req, res, next) {
  var objReponse = {'Code' : 9, 'Message':'Un erreur non géré est survenu'};
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
          // console.log(utilisateur);
          utilisateur.save(function (err, updatedUtilisateur){
            if (err) return console.error(err);
          });
          console.log('Token sauvegardé dans la bd');

          // Send mail
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mailbot84@gmail.com',
              pass: 'bonjourlespoulets'
            }
          });

          var urlResetPwd = URL_RESET + token;
          var mailOptions = {
            from: 'mailbot84@gmail.com',
            to: 'math.frechette@gmail.com',
            subject: 'Demande de réinitialisation de mot de passe.',
            html: '<h2>Plate-forme pédagogique</h2><p>Il semble que vous ayez oublié votre mot de passe. Ne vous inquiétez pas. Vous pouvez le réinitialiser en cliquant sur le lien ci-dessous.</p>' +
              '<a href="' + urlResetPwd + '">' + urlResetPwd + '</a>'
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          objReponse = {'Code' : 1, 'Message':'Le courriel a été envoyé avec succès'};
      }
      else{
          objReponse = {'Code' : 2, 'Message':'Nous n\'avons trouvé aucun compte associé à cette adresse e-mail. Veuillez réessayer ou entrer un autre adresse.'};
      }

      console.log('Réponse : ' + objReponse);
      res.json(objReponse);
  });
});

// Afficher le formulaire de récupération du mot de passe



// Modification du mot de passe
router.patch('/:id', function(req, res, next){
  var idUser = req.params.id;

  // TODO : save password in db
});

module.exports = router;
