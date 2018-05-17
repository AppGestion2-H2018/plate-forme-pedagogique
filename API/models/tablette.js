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

/**
 * Construction de l'object modèle ou en anglais Schema
 * Les règles sont écrites ici
 */
var schema = new Schema({
    user: {type: String, required: false},
    nom: {type: String, required: true},//Requis, entre 3 et 100 caractères
    livres: [{type:Schema.Types.ObjectId, ref: 'livre', required: false}],
});

//appliquer le plugin de la clé unique au modèle
schema.plugin(mongooseUniqueValidator);

//Exporter le modele
module.exports = mongoose.model('biblioteque', schema);