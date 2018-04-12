var express = require('express');
var router = express.Router();

/* GET utilisateurs listing. */
router.get('/', function(req, res, next) {
    res.send('API Plate-forme pédagogique');
});

module.exports = router;
