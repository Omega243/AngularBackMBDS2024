let mongoose = require('mongoose');
const AssignmentSchema = require('../schema/assignment.schema');

module.exports = mongoose.model('assignments', AssignmentSchema);




// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// assignment est le nom de la collection dans la base de données
// Mongoose tolère certaines erreurs dans le nom (ex: Assignent au lieu de assignments)
module.exports = mongoose.model('assignments', AssignmentSchema);
