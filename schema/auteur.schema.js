let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AuteurSchema = Schema({
    nom: String,    
    photo: String,
});

module.exports = AuteurSchema