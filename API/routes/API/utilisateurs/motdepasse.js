var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur');
var Crypto = require('crypto');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const URL_RESET = 'http://localhost:4200/motdepasse-reinitialisation/';
const MAIL_USER = 'mailbot84@gmail.com';
const MAIL_PASSWORD = 'bonjourlespoulets';

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
              user: MAIL_USER,
              pass: MAIL_PASSWORD
            }
          });

          var urlResetPwd = URL_RESET + token;
          var mailOptions = {
            from: MAIL_USER,
            to: utilisateur.courriel,
            subject: 'Demande de réinitialisation de mot de passe.',
            html: '<h2>Plate-forme pédagogique</h2><p>Bonjour, Il semble que vous ayez oublié votre mot de passe. Ne vous inquiétez pas. Vous pouvez le réinitialiser en cliquant sur le lien ci-dessous.</p>' +
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

// Validation du resetPasswordToken
router.post('/validateResetPasswordToken', function (req, res, next){
  var objReponse = {'Code' : 9, 'Message':'Un erreur non géré est survenu'};
  var resetPasswordToken = req.body.resetPasswordToken;

  Utilisateur.findOne({'resetPasswordToken': resetPasswordToken}, function (err, utilisateur) {
    if (err) return console.error(err);

    if(utilisateur !== null){
        console.log('Le resetPasswordToken est présent dans la bd');

        var currentDate = new Date();
        var expirationDate = new Date(utilisateur.resetPasswordExpires);
        console.log('currentDate : ' + currentDate);
        console.log('resetPasswordExpires : ' + expirationDate);
        if(currentDate > expirationDate){
            console.log('Le token est expiré');
            objReponse = {'Code' : 2, 'Message':'Le lien de réinitialisation est expiré. Veuillez refaire une demande.'};
        }
        else{
          console.log('Le token est valide');
          objReponse = {'Code' : 1, 'Message':'Le lien de réinitialisation est valide'};
        }


    }
    else{
      console.log('Le token est invalide');
        objReponse = {'Code' : 3, 'Message':'Le lien de réinitialisation est invalide. Veuillez refaire une demande.'};
    }

    console.log('Réponse : ' + objReponse);
    res.json(objReponse);
  });
});



// Modification du mot de passe
router.post('/resetPassword', function(req, res, next){
  var objReponse = {'Code' : 9, 'Message':'Un erreur non géré est survenu'};
  var password = req.body.new_password;
  var resetPasswordToken = req.body.resetPasswordToken;

  Utilisateur.findOne({'resetPasswordToken': resetPasswordToken}, function (err, utilisateur) {
      if (err) return console.error(err);

      if(utilisateur !== null){
          // Change la valeur de passwordExpires à maintenant pour empêcher de refaire une réinitialisation avec le même token
          var passwordExpires = new Date();
          bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hashedPassword) {
              // Save new password
              utilisateur.set({ motdepasse: hashedPassword, resetPasswordExpires: passwordExpires});
              utilisateur.save(function (err, updatedUtilisateur){
                if (err) return console.error(err);
                console.log('Mot de passe réinitialiser');
              });
            });
          });

          objReponse = {'Code' : 1, 'Message':'Le mot de passe a été réinitialisé avec succès'};
      }
      else{
          objReponse = {'Code' : 2, 'Message':'Nous n\'avons trouvé aucun compte associé à cette demande. Veuillez réessayer.'};
      }

      console.log('Réponse : ' + objReponse);
      res.json(objReponse);
  });
});

module.exports = router;
