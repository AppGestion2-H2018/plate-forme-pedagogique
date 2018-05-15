/**
 * l'option de Mongoose initée par l'équipe groupes
 * Danny Dugas, Nicolas Paquet, Andy Chartier, Jean-Sébastien Lemelin
 * @author Jean-Sébastien Lemelin
 * @reference http://mongoosejs.com/docs/models.html
 * @reference http://mongoosejs.com/docs/schematypes.html
 * @reference http://mongoosejs.com/docs/validation.html
 */
//Appeler le package
var mongoose = require('mongoose');

//Déclaration du modèle
var Schema = mongoose.Schema;

//Plugin pour valider une clé unique apliqué au shema plus bas
var mongooseUniqueValidator = require('mongoose-unique-validator');

//Plugin pour valider si l'id d'un modèle existe appliqué au shéma plus bas
var idValidator = require('mongoose-id-validator');

/**
 * Construction de l'object modèle ou en anglais Schema
 * Les règles sont écrites ici
 */
var schema = new Schema({
    nom: {type: String, required: true, minlength: 3, maxLength:100}, //Requis, entre 3 et 100 caractères
    no_groupe: {type: String, required: true}, //Requis
    debut: {type: Date, required: true}, //Requis
    fin: {type: Date, required: true}, //Requis
    utilisateurs:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}] //Tableau d'utilisateurs non requis
});

//appliquer le plugin de la clé unique au modèle
schema.plugin(mongooseUniqueValidator);

//appliquer le plugin de la validation de la cle
schema.plugin(idValidator,{message:"Enregistrement inexistant"});

//Exporter le modele
module.exports = mongoose.model('classe', schema);