var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ordersModel = require('../models/dol_orders.model');

router.get('/', function(req, res, next) {
  res.send('Orders Route Works test');
});


//Add Order data in the link 
//router.get('/add/:touristId/:time/:date/:place/:address/:status/:dol_Id', function(req, res, next) {
router.get('/add/:touristid/:time/:date/:place/:address', function(req, res, next) {
  let newOrder = new ordersModel({
    touristId:req.params.touristid,
    time:req.params.time,
    date:req.params.date,
    place:req.params.place,
    address:req.params.address,
    //dol_Id:req.params.dol_Id,
    dol_Id:"------",
    status:"on process",
  });
  newOrder.save(function(err,newOrder){
    if(err)
    res.send(err);
    else
    res.send({status:200, message:'Order Added Successfully', orderObj: newOrder});
  });
 
});


//Add Order by sending a user object in the body as json object
router.post('/addd', function(req, res, next) {
  let newOrder = new ordersModel({
    touristId:req.body.touristId,
    time:req.body.time,
    date:req.body.date,
    place:req.body.place,
    address:req.body.address,
    dol_Id:"------",
    status:"on process",
  });

  newOrder.save(function(err,newOrder){
    if(err)
    res.send(err);
    else
    res.send({status:200, message:'Order Added Successfully', orderObj: newOrder});
  });
 
});


//Get all Orders
router.get('/list', function(req, res, next) {

  ordersModel.find(function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200,resultsFound:response.length, orders: response});
  });
 
});



//All orders for one User
router.get('/ordersforuser', function(req, res, next) {

  const touristIdQuery = req.query.touristId;
  ordersModel.find({touristId: touristIdQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200,resultsFound:response.length, orders: response});
  });
 
});


//All orders for the same mother lang  ---not used untill now and not completed
router.get('/orderssameml', function(req, res, next) {

  const touristIdQuery = req.query.touristId;
  ordersModel.find({touristId: touristIdQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200,resultsFound:response.length, orders: response});
  });
 
});


//Update spacific Order in the query condition from Tourist
router.put('/updateorder', function(req, res, next) {

  const idQuery = req.query.id;
  const timeQuery = req.query.time;
  const dateQuery = req.query.date;
  const placeQuery = req.query.place;
  const addressQuery = req.query.address;
 
  ordersModel.findByIdAndUpdate(idQuery,{time:timeQuery,date:dateQuery,place:placeQuery,address:addressQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, orders: response});
  });
 
});


//Update spacific Order in the query condition from Dolmitcher
router.put('/acceptorder', function(req, res, next) {

  const idQuery = req.query.id;
  const dol_IdQuery=req.query.dol_Id;
  const statusQuery = "Accepted";
 
 
  ordersModel.findByIdAndUpdate(idQuery,{dol_Id:dol_IdQuery,status:statusQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, orders: response});
  });
 
});

//DeleteOrder
router.delete('/deletorder', function(req, res, next) {

  const idQuery = req.query.id;
  ordersModel.findByIdAndDelete(idQuery,function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, orders: response});
  });
 
});

module.exports = router;










