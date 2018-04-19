/**
 * Module de routes API créé par Jean-Sébastien Lemelin
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();
var Groupe = require('../../../models/groupe');
var Utilisateur = require('../../../models/utilisateur');
var Programme = require('../../../models/programme');
var Type = require('../../../models/type');

/**************************************** GESTION DES GROUPES *****************************/
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
 */
router.post('/', function(req, res, next) {
    var newGroup = req.body;
    //CRÉER LE TABLEAU DE CLASSE S'IL Y EN A UN

    //CRÉER LE TABLEAU DE PROGRAMME S'IL EXISTE

    //Vérifie si le propriétaire existe.
    Utilisateur.findById(newGroup.proprietaire, function(err, result){
        if(err) return res.status(500).send(err);
        var groupe = new Groupe({
            proprietaire:newGroup.proprietaire,
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
/************************************* FIN GESTION DES GROUPES *****************************/
/************************************** GESTION DES PROGRAMMES *****************************/

/**
 * afficher tous les programmes
 */
router.get('/programmes/all', function (req, res, next) {
    Programme.find(function (err, groupe){
        if (err) return handleError(err, query);
        res.json(groupe);
    });
});

/**
 * afficher un programme par son id
 */
router.get('/programmes/:id', function (req, res, next) {
    var objectId = req.params.id;
    Programme.findById(objectId,function (err, programme){
        if (err) return handleError(err, query);
        res.json(programme);
    });
});
/************************************ FIN GESTION DES PROGRAMMES *****************************/

/**************************************** GESTION DES TYPES **********************************/

/**
 * afficher tous les types
 */
router.get('/types/all', function (req, res, next) {
    Type.find(function (err, groupe){
        if (err) return handleError(err, query);
        res.json(groupe);
    });
});

/**
 * afficher un type par son id
 */
router.get('/types/:id', function (req, res, next) {
    var objectId = req.params.id;
    Type.findById(objectId,function (err, type){
        if (err) return handleError(err, query);
        res.json(type);
    });
});
/************************************ FIN GESTION DES TYPES *****************************/


module.exports = router;
