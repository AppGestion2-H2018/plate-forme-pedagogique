var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    da: {type: Number, required: true, unique: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    courriel: {type: String, required: true, unique: true},
    datedenaissance: {type: Date, required: true},
    codepermanent: {type: String, required: true, unique: true},
    programme: {type: Number, required: false},
    sexe: {type: String, required: true},
    role: {type: Number, required: false},
    motdepasse: {type: String, required: true},
    photo: {type: String, required: false},
    access_token: {
        remember_token: {type: String},
        token_type: {type: String},
        expires_in: {type: Number},
        created_at: {type: Date}
    }
});

//PLugin pour valider un champs unique
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('utilisateur', schema);
