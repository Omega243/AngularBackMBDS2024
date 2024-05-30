var mongoose = require('mongoose');  
const UserSchema  = require('../schema/user.schema');

module.exports = mongoose.model('user',UserSchema);