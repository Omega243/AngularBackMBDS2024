const MatiereSchema = require('./matiere.schema');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const auteur = require('../model/auteur');
const AuteurSchema = require('./auteur.schema');

let AssignmentSchema = Schema({
    id:  Number, 
    dateDeRendu: Date, 
    nom: String, 
    rendu: Boolean, 
    auteur: AuteurSchema,
    matiere: MatiereSchema,
    note: { type: Number, required: false },
    remarque: { type: String, required: false },
    
});

AssignmentSchema.plugin(aggregatePaginate);
module.exports = AssignmentSchema;
