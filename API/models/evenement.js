/**
 * Created by Client on 2018-04-20.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    text: {type: String, required: true},
    description: {type: String, required: true},
    categorie: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    type: {type: String, required: true},
    creation_date: {type: Date, required: true},
    admin_id:{type:Schema.Types.ObjectId, ref: 'utilisateur', required: false},
    group_id:{type:Schema.Types.ObjectId, ref: 'groupe', required: false},
    active:{type:Boolean, required: true},
});

//PLugin pour valider un champs unique
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('evenement', schema);