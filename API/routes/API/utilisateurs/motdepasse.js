var express = require('express');
var router = express.Router();


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
