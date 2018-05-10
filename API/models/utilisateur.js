var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    da: {type: String, required: true, unique: true}, // TODO : Validation client : Manque le UNIQUE
    nom: {type: String, required: true}, // TODO : Validation client : OK
    prenom: {type: String, required: true}, // TODO : Validation client : OK
    courriel: {type: String, required: true, unique: true}, // TODO : Validation client : Manque le UNIQUE
    datedenaissance: {type: Date, required: true}, //TODO: 3/4 DONE!
    codepermanent: {type: String, required: true, unique: true}, // TODO : Validation client : Manque le UNIQUE
    programme: {type: Schema.Types.ObjectId, required: false}, //TODO: NOT SURE!
    sexe: {type: String, required: true}, //TODO: NOT SURE!
    role: {type: Schema.Types.ObjectId, required: false}, //TODO: NOT SURE!
    motdepasse: {type: String, required: true}, // TODO : Validation client : OK ; Manque le cryptage
    photo: {type: String, required: false}, // TODO : Validation client : À faire
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
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
