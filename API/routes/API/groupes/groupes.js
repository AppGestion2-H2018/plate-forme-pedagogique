/**
 * Module de routes API créé par Jean-Sébastien Lemelin
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();
var Groupe = require('../../../models/groupe');

router.post('/', function(req, res, next) {
    var groupe = new Groupe({
        nom:'Apprendrsdfasdfe',
        actif:1
    });
    groupe.save();
    res.json(groupe);
});



module.exports = router;
