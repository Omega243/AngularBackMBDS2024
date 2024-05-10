const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const UserSchema = new Schema({
    id: Number,
    nom: String, 
    prenom: String,
    email: { type: String, required: true } ,
    mdp: String,
    role: ObjectId,
    token: String,
}) ;

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema) ;