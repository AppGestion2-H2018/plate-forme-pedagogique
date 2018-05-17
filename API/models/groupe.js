/**
 * l'option de MONGOOSE initée par l'équipe groupes
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
    proprietaire:{type:Schema.Types.ObjectId, ref: 'utilisateur', required: true}, //type utilisateur, requis
    nom: {type: String, required: true, minlength: 3, maxlength:100}, //requis, longueur entre 3 et 100 caractères
    description: {type: String, required: false, maxlength:100}, //pas requis, pas plus de 100 caractères
    date_fin: {type: Date, required: false}, // non requis
    actif: {type: Boolean, required:true}, // requis
    est_publique: {type: Boolean, required: true}, //requis
    commenter: {type: Boolean, required: true}, //requis
    super_admins: [{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}], //tableau d'utilisateurs non requis
    admins: [{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}], //tableau d'utilisateurs non requis
    programmes:[{type:Schema.Types.ObjectId, ref: 'programme', required: false}],//tableau de programmes non requis
    classes:[{type:Schema.Types.ObjectId, ref: 'classe', required: false}],//tableau de classes non requis
    types:[{type:Schema.Types.ObjectId, ref: 'type', required: false}],//tableau de types (appelé role dans utilisateur) non requis
    utilisateurs:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],//tableau d'utilisateurs non requis
    blacklist:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}]//tableau d'utilisateurs non requis
});

//appliquer le plugin de la clé unique au modèle
schema.plugin(mongooseUniqueValidator);

//appliquer le plugin de la validation de la cle
schema.plugin(idValidator,{message:"Enregistrement inexistant"});

//Exporter le modele
module.exports = mongoose.model('groupe', schema);