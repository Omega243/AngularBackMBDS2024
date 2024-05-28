let mongoose = require('mongoose');
const ProfSchema = require('./prof.schema');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nom:String,
    photo: String,
    prof: ProfSchema
});

module.exports = MatiereSchema;