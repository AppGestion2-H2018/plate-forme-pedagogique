var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nom: {type: String, required: true},
    actif: {type: boolean},
    public: {type: boolean},
    commenter: {type: boolean},
    proprietaire: {type: Schema.Types.ObjectId, ref: 'utilisateur', unique: true},
    super_admin: [{type: Schema.Types.ObjectId, ref: 'utilisateur'}],
    admin: [{type: Schema.Types.ObjectId, ref: 'utilisateur'}],
    membres: [{type: Schema.Types.ObjectId, ref: 'utilisateur'}],
    classes: [{type: Schema.Types.ObjectId, ref: 'classe'}],
    programmes: [{type: Schema.Types.ObjectId, ref: 'programme'}],
    types:[{type: Schema.Types.ObjectId, ref: 'programme'}],//Étudiant, prof, staff
    banis:[{type: Schema.Types.ObjectId, ref: 'utilisateur'}],
    date_fin: {type: Date},
    code_inscription: {type: String, unique:true}
});

//PLugin pour valider un champs unique
Schema.plugins(mongooseUniqueValidator);

module.exports = mongoose.model('groupe', schema);