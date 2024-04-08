let mongoose = require('mongodb');
let Schema = mongoose.Schema;
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentViewSchema = Schema({
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean,
    note: Number,
    remarque: String,
    matiere:{
       nom: String,
       photo: String
    },
    prof: {
        nom: String,
        photo: String
    }
});

AssignmentViewSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('assignmentsView', AssignmentViewSchema)