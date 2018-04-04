var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nom:{type: String, required:true},
    prenom:{type: String, required:true},
    courriel:{type: String, required:true, unique:true},
    groupes:[{type:Schema.Types.ObjectId, ref: 'groupe'}],

});

//PLugin pour valider un champs unique
Schema.plugins(mongooseUniqueValidator);

module.exports = mongoose.model('utilisateur', schema);