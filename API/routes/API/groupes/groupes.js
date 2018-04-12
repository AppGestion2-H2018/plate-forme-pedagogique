/**
 * Module de routes API créé par Jean-Sébastien Lemelin
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();
var Groupe = require('../../../models/groupe');

/**
 * afficher tous les groupes
 */
router.get('/', function (req, res, next) {
    Groupe.find(function (err, groupe){
        if (err) return handleError(err, query);
        res.json(groupe);
    });
});

/**
 * Enregistrer un groupe
 */
router.post('/', function(req, res, next) {
    var newGroup = req.body;

    var groupe = new Groupe({
        nom:newGroup.nom,
        actif:newGroup.actif,
        public:newGroup.public
    });
    groupe.save();
    res.json(groupe);
});

/**
 * Trouver un groupe par son id
 */
router.get('/:id', function (req, res, next) {
    var objectId = req.params.id;
    Groupe.findById(objectId,function(err,groupe){
        if (err) return res.status(500).send(err);
        return res.send(groupe);
    });
});

/**
 * Modifier un groupe par son id
 */
router.put('/', function (req, res, next) {
    var objet = req.body;
    Groupe.findByIdAndUpdate(objet._id,objet,{new:true},function(err,groupe){
        if (err) return res.status(500).send(err);
        return res.send(groupe);
    });
});

/**
 * Effacer un groupe par son id
 */
router.delete('/:idGroupe', function (req, res, next) {
    var idGroupe = req.params.idGroupe;
    Groupe.remove({'_id': idGroupe}, function(err, result) {
        if (err) return handleError(err, query);
        res.json(result);
    });
});


module.exports = router;
