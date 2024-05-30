var mongoose = require('mongoose');  
let Schema = mongoose.Schema;
var UserSchema = Schema({  
  nom: String,
  email: String,
  password: String,
  role : Number,
  photo : String
});

module.exports = UserSchema;