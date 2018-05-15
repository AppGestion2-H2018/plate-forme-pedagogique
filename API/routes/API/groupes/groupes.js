/**
 * Routes pour l'équipe groupes
 * Danny Dugas, Nicolas Paquet, Andy Chartier, Jean-Sébastien Lemelin
 * @author Jean-Sébastien Lemelin
 */
/**
 * Appeler les paquets
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();
/**
 * Déclaration des modèles avec lesquels les routes travaillent
 * @reference http://mongoosejs.com/docs/models.html
 * @reference http://mongoosejs.com/docs/queries.html
 */
var Groupe = require('../../../models/groupe');
var Programme = require('../../../models/programme');
var Type = require('../../../models/type');
var Classe = require('../../../models/classe');

/*********************************************** GESTION DES GROUPES **************************************************/

/**
 * afficher tous les groupes
 */
router.get('/all', function (req, res, next) {
    Groupe.find(function (err, groupes){
        if (err) return handleError(err, query);//Si erreur retourne une erreur
        res.json(groupes);//S'il se rend il revoie les groupes en JSON
    });
});

/**
 * Enregistrer un groupe
 */
router.post('/', function(req, res) {
    var newGroup = req.body; //Récupère le contenu du corps de la requête préformattée en JSON

    /***********************  CRÉER L'OBJET groupe AVEC LES ÉLÉMENTS OBLIGATOIRES ****************/
    var groupe = new Groupe({
        proprietaire: newGroup.proprietaire,
        nom: newGroup.nom,
        actif: newGroup.actif,
        est_publique: newGroup.est_publique,
        commenter: newGroup.commenter,
    });
    /************************** FIN CRÉER L'OBJET groupe AVEC LES ÉLÉMENTS OBLIGATOIRES ***********/
    /***********************  CRÉER L'OBJET groupe AVEC LES ÉLÉMENTS OPTIONNELS *******************/
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
    /*********************** FIN CRÉER L'OBJET groupe AVEC LES ÉLÉMENTS OPTIONNELS ****************/

    //Procéder à la sauvegarde
    groupe.save(function (err, result) {
        if (err) return res.status(500).send(err);//Mongoose renvera une erreur si le modèle n'est pas respecté
        res.send(result); //Un résultat avec codes de succès sera renvoyé
    });
});

/**
 * Trouver un groupe par son id
 */
router.get('/:id', function (req, res) {
    //Obtenir le id passé en paramètre
    var objectId = req.params.id;

    //Trouver par Id (Fonction mongoose)
    Groupe.findById(objectId,function(err,groupe){
        if (err) return res.status(500).send(err);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(groupe == null){
            return res.send({"code":0,"message":"Le groupe n'existe pas"});// Si rien trouvé, renvoyer une erreur
        }
        return res.send(groupe);//Le groupe est envoyé en format JSON
    });
});

/**
 * Modifier un groupe par son id
 */
router.put('/', function (req, res, next) {
    var objet = req.body;
    Groupe.findByIdAndUpdate(objet._id,objet,{new:true},function(err,groupe){
        if (err) return res.status(500).send(err);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(groupe == null){
            return res.send({"code":0,"message":"Le groupe n'existe pas"});// Si rien trouvé, renvoyer une erreur 0
        }
        return res.send(groupe);//Le groupe modifié est envoyé en format JSON
    });
});

/**
 * Effacer un groupe par son id
 */
router.delete('/delete/:idGroupe', function (req, res, next) {
    var idGroupe = req.params.idGroupe;
    Groupe.remove({'_id': idGroupe}, function(err, result) {
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(result.n == 0){
            res.json({code:0,message:'Ce groupe n\'existe pas'});// Si rien trouvé, renvoyer une erreur 0
        }else{
            res.json({code:1,message:'Le groupe a été effacé'}); // Si le groupe a été effacé, renvoyer un message code 1
        }
    });
});

/**
 * Purger la base de données... À utiliser avec parcimonie :))))
 */
router.purge('/es-tusurtabarnik', function (req, res, next) {

    Groupe.remove({}, function(err, result) {
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(result.n == 0){
            res.json({code:0,message:'Il n\'y avait aucun document dans la collection'});// Si rien trouvé, renvoyer une erreur 0
        }else{
            res.json({code:1,message:'La collection a été enlevée'}); //Si la collection a été vidée, renvoyer de le code 1
        }
    });
});
/************************************************ FIN GESTION DES GROUPES *********************************************/

/*************************************************** GESTION DES TYPES ************************************************/

/**
 * afficher tous les types
 */
router.get('/types/all', function (req, res, next) {
    Type.find(function (err, types){
        if (err) return handleError(err, query); //Mongoose renvera une erreur si le modèle n'est pas respecté
        if(types == null){
            return res.send({"code":0,"message":"Il n'y a pas de types"}); // Si rien trouvé, renvoyer une erreur 0
        }
        res.json(types); //Le tableau de types est envoyé en format JSON
    });
});

/**
 * afficher un type par son id
 */
router.get('/types/:id', function (req, res, next) {
    var objectId = req.params.id;
    Type.findById(objectId,function (err, type){
        if (err) return handleError(err, query); //Mongoose renvera une erreur si le modèle n'est pas respecté
        if(type== null){
            return res.send({"code":0,"message":"Le type n'existe pas"}); // Si rien trouvé, renvoyer une erreur 0
        }
        res.json(type);//Le type est envoyé en format JSON
    });
});
/************************************************* FIN GESTION DES TYPES **********************************************/

/************************************************** GESTION DES CLASSES ***********************************************/

/**
 * afficher tous les classes
 */
router.get('/classes/all', function (req, res, next) {
    Classe.find(function (err, classe){
        if (err) return handleError(err, query); // pb de connection ou avec le modèke
        res.json(classe); //Un tableau de classes est envoyé en format JSON
    });
});

/**
 * Créer une classe
 */
router.post('/classes', function(req, res, next) {
    var newClasse = req.body;

    //CRÉER L'OBJET AVEC LES ÉLÉMENTS OBLIGATOIRES
    var classe = new Classe({
        nom: newClasse.nom,
        no_groupe: newClasse.no_groupe ,
        debut: newClasse.debut,
        fin: newClasse.fin,
    });

    //CRÉER LE TABLEAU D'UTILISATEURS S'IL EXISTE
    if (newClasse.utilisateurs !== null) {
        classe.utilisateurs = newClasse.utilisateurs;
    }
    //Enregistrer la classe
    classe.save(function (err, result) {
        if (err) return res.status(500).send(err);//Mongoose renvera une erreur si le modèle n'est pas respecté
        res.json(classe); //Si la classe a été créée, renvoyer la classe
    });
});

/**
 * afficher une classe par son id
 */
router.get('/classes/:id', function (req, res, next) {
    var objectId = req.params.id;
    Classe.findById(objectId,function (err, classe){
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(classe== null){
            return res.send({"code":0,"message":"La classe n'existe pas"}); // Si rien trouvé, renvoyer une erreur 0
        }
        res.json(classe); //Renvoi la classe recherchée
    });
});

/**
 * Modifier une classe par son id
 */
router.put('/classes', function (req, res, next) {
    var objet = req.body;
    Classe.findByIdAndUpdate(objet._id,objet,{new:true},function(err,classe){
        if (err) return res.status(500).send(err);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(classe == null){
            return res.send({"code":0,"message":"La classe n'existe pas"}); // Si rien trouvé, renvoyer une erreur 0
        }
        return res.send(classe);//Renvoi la classe modifiée
    });
});

/**
 * Effacer une classe par son id
 */
router.delete('/classes/delete/:idClasse', function (req, res, next) {
    var idClasse = req.params.idClasse;
    Classe.remove({'_id': idClasse}, function(err, result) {
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(result.n == 0){
            res.json({code:0,message:'Cette classe n\'existe pas' }); // Si rien trouvé, renvoyer une erreur 0
        }else{
            res.json({code:1,message:'La classe a été enlevée'});  //Si la classe est enlevée, renvoyer de le code 1
        }
    });
});

/**
 * Purger la base de données des classes ... À utiliser avec parcimonie :))))
 */
router.purge('/classes/es-tusurtabarnik', function (req, res, next) {

    Classe.remove({}, function(err, result) {
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
            if(result.n == 0){
                res.json({code:0,message:'Il n\'y avait aucun document dans la collection'}); // Si rien trouvé, renvoyer une erreur 0
            }else{
                    res.json({code:1,message:'La collection a été enlevée'}); //Si la collection a été vidée, renvoyer de le code 1
            }
        });
    });

/************************************************ FIN GESTION DES CLASSES *********************************************/

/************************************************ GESTION DES PROGRAMMES **********************************************/

/**
 * afficher tous les programmes
 */
router.get('/programmes/all', function (req, res, next) {
    Programme.find(function (err, groupes){
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        res.json(groupes); //Renvoyer un tableau de groupes
    });
});

router.post('/programmes', function(req, res, next) {
    var newProgramme = req.body;

    //CRÉER L'OBJET AVEC LES ÉLÉMENTS OBLIGATOIRES
    var programme = new Programme({
        nom: newProgramme.nom,
        no_groupe: newProgramme.no_groupe ,
        debut: newProgramme.debut,
        fin: newProgramme.fin,
    });

    //CRÉER LE TABLEAU D'UTILISATEURS S'IL EXISTE
    if (newProgramme.utilisateurs !== null) {
        programme.utilisateurs = newProgramme.utilisateurs;
    }
    //Enregistrer la programme
    programme.save(function (err, result) {
        if (err) return res.status(500).send(err);//Mongoose renvera une erreur si le modèle n'est pas respecté
        res.json({code:1,message:'Le programme a été créé'}); //Si le programme a été sauvé, renvoyer de le code 1
    });
});

/**
 * afficher un programme par son id
 */
router.get('/programmes/:id', function (req, res, next) {
    var objectId = req.params.id;
    Programme.findById(objectId,function (err, programme){
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        res.json(programme);
    });
});

/**
 * Modifier un programme par son id
 */
router.put('/programmes', function (req, res, next) {
    var objet = req.body;
    Programme.findByIdAndUpdate(objet._id,objet,{new:true},function(err,programme){
        if (err) return res.status(500).send(err);
        if(programme == null){
            return res.send({"code":0,"message":"La programme n'existe pas"});// Si rien trouvé, renvoyer une erreur 0
        }
        return res.send(programme);
    });
});

/**
 * Effacer un programme par son id
 */
router.delete('/programmes/delete/:idProgramme', function (req, res, next) {
    var idProgramme = req.params.idProgramme;
    Programme.remove({'_id': idProgramme}, function(err, result) {
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(result.n == 0){
            res.json({code:0,message:'Ce programme n\'existe pas' }); // Si rien trouvé, renvoyer une erreur 0
        }else{
            res.json({code:1,message:'La programme a été enlevé'});
        }
    });
});

/**
 * Purger la base de données des programmes ... À utiliser avec parcimonie :))))
 */
router.purge('/programmes/es-tusurtabarnik', function (req, res, next) {

    Programme.remove({}, function(err, result) {
        if (err) return handleError(err, query);//Mongoose renvera une erreur si le modèle n'est pas respecté
        if(result.n == 0){
            res.json({code:0,message:'Il n\'y avait aucun document dans la collection'}); // Si rien trouvé, renvoyer une erreur 0
        }else{
            res.json({code:1,message:'La collection a été enlevée'});
        }
    });
});

/************************************************ FIN GESTION DES PROGRAMMES ******************************************/

module.exports = router;
