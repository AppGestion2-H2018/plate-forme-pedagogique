var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nom: {type: String, required: true},
});

//PLugin pour valider un champs unique
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('type', schema);