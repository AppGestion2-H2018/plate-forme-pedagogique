var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('api Résultats scolaires');
});

module.exports = router;
