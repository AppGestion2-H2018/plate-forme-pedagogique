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
router.get('/all', function (req, res, next) {
    Groupe.find(function (err, groupe){
        if (err) return handleError(err, query);
        res.json(groupe);
    });
});

/**
 * Enregistrer un groupe
 * todo Ajouter des mock de classe, d'usager
 * todo S'assurer que les types et le programme
 * fait partie de l'usager et faire un modèle pour chacun
 */
router.post('/', function(req, res, next) {
    var newGroup = req.body;
    var groupe = new Groupe({
        nom:newGroup.nom,
        actif: newGroup.actif,
        est_publique: newGroup.est_publique,
        commenter: newGroup.commenter
    });
    groupe.save(function (err, result){
        if (err) return res.status(500).send(err);
        res.send(result);
    });
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

/**
 * Purger la base de données... À utiliser avec parcimonie :))))
 */
router.purge('/es-tusurtabarnik', function (req, res, next) {

    Groupe.remove({}, function(err, result) {
        if (err) return handleError(err, query);
        res.json("collection enlevée");
    });
});

module.exports = router;
