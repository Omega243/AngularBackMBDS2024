let mongoose = require('mongoose');
const AssignmentSchema = require('../schema/assignment.schema');

module.exports = mongoose.model('assignments', AssignmentSchema);

