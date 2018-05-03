var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');
var idValidator = require('mongoose-id-validator');

var schema = new Schema({
    proprietaire:{type:Schema.Types.ObjectId, ref: 'utilisateur', required: true},
    nom: {type: String, required: true, minlength: 3, maxLength:100},
    description: {type: String, required: false, minlength: 3, maxLength:100},
    date_fin: {type: Date, required: false},
    actif: {type: Boolean, required:true},
    est_publique: {type: Boolean, required: true},
    commenter: {type: Boolean, required: true},
    super_admins: [{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],
    admins: [{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],
    programmes:[{type:Schema.Types.ObjectId, ref: 'programme', required: false}],
    classes:[{type:Schema.Types.ObjectId, ref: 'classe', required: false}],
    types:[{type:Schema.Types.ObjectId, ref: 'type', required: false}],
    utilisateurs:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}],
    blacklist:[{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false}]
});

//PLugin pour valider un champs unique
schema.plugin(mongooseUniqueValidator);
schema.plugin(idValidator,{message:"Enregistrement inexistant"});

module.exports = mongoose.model('groupe', schema);