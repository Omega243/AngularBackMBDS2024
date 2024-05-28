let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfSchema = Schema({
    nom: String,
    photo: String,
});

module.exports = ProfSchema;