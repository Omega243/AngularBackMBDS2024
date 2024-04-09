const mongoose = require('mongoose') ;
const Schema = mongoose.Schema ;
const ObjectId = require("mongodb").ObjectId ;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

const UserSchema = new Schema({
    nom: { type: String, required: true } ,
    prenom: { type: String, required: true } ,
    email: { type: String, required: true } ,
    mdp: { type: String, required: true } ,
    photo: { type: String, required: true},
    role: { type: ObjectId, ref: "Role", required: true }
}) ;

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema) ;