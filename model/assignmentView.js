let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

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

AssignmentViewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('assignmentsView', AssignmentViewSchema, 'assignmentsView')