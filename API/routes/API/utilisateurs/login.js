var express = require('express');
var router = express.Router();


// Test pour voir que ça fonctionne, à supprimer
router.get('/', function(req, res, next) {
    res.send('Login');
});


module.exports = router;
