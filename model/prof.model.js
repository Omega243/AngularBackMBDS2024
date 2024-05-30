let mongoose = require('mongoose');
const ProfSchema = require('../schema/prof.schema');

module.exports = mongoose.model('prof', ProfSchema);

