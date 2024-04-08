let mongoose = require('mongodb');
let Schema = mongoose.Schema;
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let UserSchema = Schema({
    nom:{
        type: String,
        required: true
    },
    photo: String,
    role:String
});

module.exports = mongoose.model('users', UserSchema)