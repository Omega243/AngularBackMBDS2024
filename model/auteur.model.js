let mongoose = require('mongoose');
const AuteurSchema = require('../schema/auteur.schema');

module.exports = mongoose.model('auteur', AuteurSchema);

