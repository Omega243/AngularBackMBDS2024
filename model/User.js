let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let UserSchema = Schema({
    nom:{
        type: String,
        required: true
    },
    photo: String,
    role:String
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users', UserSchema)