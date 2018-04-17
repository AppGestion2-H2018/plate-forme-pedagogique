var express = require('express');
var router = express.Router();
var Utilisateur = require('../../../models/utilisateur')


// router.post('/test',function (req,res,next) {
//     Utilisateur.find({'da': req.body.da}, function (err, utilisateur) {
//
//         if (err) return console.error(err);
//         res.json(utilisateur);
//     });
// });



// permet d'aller chercher les informations dans la base de donner un da d'un utilisateur
//de plus, il va regarder si le da est valide sinon renvoye un message d'érreure
//si sa fonctionne il va chercher son mots de passe et le retourne par la valeur utilisateur
//todo il nes pas terminer
router.get('/', function(req, res, next) {
    Utilisateur.find({},{_id:0,da:1},function (err, utilisateur) {
        if (err) return console.error(err);
        Utilisateur.find({},{_id:0,motdepasse:1},function (err, utilisateur) {
            if (err) return console.error(err);
            res.json(utilisateur);
        });
    })
});




// // Retrouver un utilisateur avec son motdepasse
// router.get('/:motdepasse', function (req, res, next) {
//     Utilisateur.find({'motdepasse': req.params.motdepasse}, function (err, utilisateur) {
//         if (err) return console.error(err);
//         res.json(utilisateur);
//     });
// });


module.exports = router;
