const AuteurSchema = require('./auteur.schema');
const MatiereSchema = require('./matiere.schema');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    auteur: AuteurSchema,
    matiere: MatiereSchema,
    note: {
        type: Number,
        required: false
    },
    remarques: {
        type: String,
        required: false
    }
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche


module.exports = AssignmentSchema;

