const mongoose = require('mongoose');
//Schema
var dol_ordersSchema = mongoose.Schema({
    touristId:String,
    time:String,
    date:String,
    place:String,
    address:String,
    dol_Id:String,
    status:String
  });
  
  //Model
  var dol_OrdersModel = mongoose.model("dol_Orders",dol_ordersSchema);


  module.exports = dol_OrdersModel;
  