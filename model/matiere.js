let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let MatiereSchema = Schema({
    nom:String,
    photo: String,
    idProf: mongoose.Schema.Types.ObjectId
});

MatiereSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('matieres', MatiereSchema)