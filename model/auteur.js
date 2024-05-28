let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const AuteurSchema = require('../schema/auteur.schema');

module.exports = mongoose.model('auteurs', AuteurSchema);