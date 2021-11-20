const mongoose = require('mongoose');
//Schema
var dol_usersSchema = mongoose.Schema({
    userName:String,
    email:String,
    phone:String,
    city:String,
    motherLanguage:String,
    accntType:String,
    deutschLevel:String,
    password:String
  });
  
  //Model
  var dol_UsersModel = mongoose.model("dol_Users",dol_usersSchema);


  module.exports = dol_UsersModel;
  