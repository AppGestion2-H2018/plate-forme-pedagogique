
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
var Classe = require('../../../models/classe');

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


    //Vérifie si le propriétaire existe.
    //Utilisateur.findById(newGroup.proprietaire, function(err, result){
    //if (err) return res.status(500).send(err);

    //CRÉER L'OBJET AVEC LES ÉLÉMENTS OBLIGATOIRES
    var groupe = new Groupe({
        proprietaire: newGroup.proprietaire,
        nom: newGroup.nom,
        actif: newGroup.actif,
        est_publique: newGroup.est_publique,
        commenter: newGroup.commenter,
    });
    //Creer une description s'il y en a une
    if(newGroup.description !== null){
        groupe.description = newGroup.description;
    }

    //Creer une description s'il y en a une
    if(newGroup.date_fin!== null){
        groupe.date_fin = newGroup.date_fin;
    }

    //CRÉER LE TABLEAU D'UTILISATEURS S'IL EXISTE
    if (newGroup.utilisateurs !== null) {
        groupe.utilisateurs = newGroup.utilisateurs;
    }

    //CRÉER LE TABLEAU DE PROGRAMME S'IL EXISTE
    if (newGroup.programmes !== null) {
        groupe.programmes = newGroup.programmes;
    }

    //CRÉER LE TABLEAU DE CLASSE S'IL EXISTE
    if (newGroup.classes !== null) {
        groupe.classes = newGroup.classes;
    }

    //CRÉER LE TABLEAU DE TYPE S'IL EXISTE
    if (newGroup.types !== null) {
        groupe.types = newGroup.types;
    }

    //CRÉER LE TABELAU D'ADMIN S'IL EXISTE
    if (newGroup.admins !== null) {
        groupe.admins = newGroup.admins;
    }

    //CRÉER LE TABLEAU DE SUPER-ADMIN S'IL EXISTE
    if (newGroup.super_admins !== null) {
        groupe.super_admins = newGroup.super_admins;
    }

    //CRÉER LE TABLEAU DE BLACKLIST S'IL EXISTE
    if (newGroup.blacklist !== null) {
        groupe.blacklist = newGroup.blacklist;
    }

    groupe.save(function (err, result) {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
    //});


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
        if(result.n == 0){
            res.json({code:0,message:'Aucun enregistrement'});
        }else{
            res.json({code:1,message:'Aucun enregistrement'});
        }
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

/**************************************** GESTION DES CLASSES**********************************/

/**
 * afficher tous les types
 */
router.get('/classes/all', function (req, res, next) {
    Classe.find(function (err, classe){
        if (err) return handleError(err, query);
        res.json(classe);
    });
});

/**
 * afficher un type par son id
 */
router.get('/classes/:id', function (req, res, next) {
    var objectId = req.params.id;
    Classe.findById(objectId,function (err, classe){
        if (err) return handleError(err, query);
        res.json(classe);
    });
});
/************************************ FIN GESTION DES CLASSES *****************************/

module.exports = router;
