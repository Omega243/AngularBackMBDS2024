let mongoose = require('mongoose');
const ProfSchema = require('./prof.schema');

let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nom: String,
    photo: String,
    prof: ProfSchema,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// le nom de la collection (par défaut assignments) sera au pluriel, 
// soit assignments
// Si on met un nom "proche", Mongoose choisira la collection
// dont le nom est le plus proche

module.exports = MatiereSchema;

