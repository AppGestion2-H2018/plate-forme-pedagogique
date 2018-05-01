var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    da: {type: String, required: true, unique: true}, //TODO: DONE!
    nom: {type: String, required: true}, //TODO: DONE!
    prenom: {type: String, required: true}, //TODO: DONE!
    courriel: {type: String, required: true, unique: true}, //TODO: DONE!
    datedenaissance: {type: Date, required: true}, //TODO: 3/4 DONE!
    codepermanent: {type: String, required: true, unique: true}, //TODO: DONE!
    programme: {type: Schema.Types.ObjectId, required: false},
    sexe: {type: String, required: true}, //TODO: NOT SURE!
    role: {type: Schema.Types.ObjectId, required: false},
    motdepasse: {type: String, required: true}, //TODO: DONE!
    photo: {type: String, required: false},
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
