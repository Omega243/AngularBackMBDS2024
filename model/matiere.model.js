let mongoose = require('mongoose');
const MatiereSchema = require('../schema/matiere.schema');

module.exports = mongoose.model('matiere', MatiereSchema);

