/**
 * Created by Client on 2018-04-10.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nom:{type: String, required:true},
    description:{type: String, required:true},
    categorie:{type: String, required:true, unique:true},
    date_debut:{type: Date, required:true, unique:true},
    date_fin:{type: Date, required:true, unique:true},
    date_creation:{type: Date, required:true, unique:true},
    type:{type: String, required:true, unique:true},
    groupe_id:{type: Number, required:true, unique:true},
    actif:{type: Boolean, required:true, unique:true},

});

//PLugin pour valider un champs unique
Schema.plugins(mongooseUniqueValidator);

module.exports = mongoose.model('evenement', schema);