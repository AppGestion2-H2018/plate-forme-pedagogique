var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nom: {type: String, required: true, minlength: 3, maxLength:100},
    no_groupe: {type: String, required: true},
    debut: {type: Date, required: true},
    fin: {type: Date, required: true},
    utilisateurs:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}]
});

//PLugin pour valider un champs unique
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('classe', schema);