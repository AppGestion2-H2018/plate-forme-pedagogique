var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var mongooseUniqueValidator = require('mongoose-unique-validator');
//todo faire un modele type
//todo faire un modele programme


var schema = new Schema({
    proprietaire:{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false},
    nom: {type: String, required: true},
    date_fin: {type: Date, required: false},
    actif: {type: Boolean, required:true},
    est_publique: {type: Boolean, required: true},
    commenter: {type: Boolean, required: true},
    super_admin: [{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],
    admin: [{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],
    programmes:[{type:Schema.Types.ObjectId, ref: 'programme', required: false}],
    classes:[{type:Schema.Types.ObjectId, ref: 'classe', required: false}],
    type:[{type:Schema.Types.ObjectId, ref: 'type', required: false}],
    utilisateurs:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],
    blacklist:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}]
});

//PLugin pour valider un champs unique
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('groupe', schema);