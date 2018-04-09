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

/**
 * afficher une tâche par son ID
 */
router.get('/:idGroupe', function (req, res, next) {
    var idGroupe = req.params.idGroupe;
    var query = Groupe.findOne({ '_id': idGroupe });
    query.select('nom actif');


    // execute the query at a later time
    query.exec(function (err, groupe) {
        if (err) return handleError(err, query);
        res.json(groupe);
    });
});


module.exports = router;
