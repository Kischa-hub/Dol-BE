var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const usersModel = require('../models/dol_users.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users Route Works test');
});

//Add a new User static for test 
router.get('/addstatic', function(req, res, next) {
  let newUser = new usersModel({
    userName:"Kareem",
    email:"kischa@gmail.com",
    phone:"00966560279285",
    city:"Madinah",
    motherLanguage:"Arabic",
    accntType:"Tourist",
    deutschLevel:"C1",
    password:"123456"
  });
  newUser.save(function(err,newUser){
    if(err)
    res.send(err);
    else
    res.send({status:200, message:'Users Added Successfully', userObj: newUser});
  });
 
});

//Add user data in the link 
router.get('/add/:userName/:email/:phone/:city/:mlang/:acttype/:deutchlvl/:password', function(req, res, next) {

  let newUser = new usersModel({
    userName:req.params.userName,
    email:req.params.email,
    phone:req.params.phone,
    city:req.params.city,
    motherLanguage:req.params.mlang,
    accntType:req.params.acttype,
    deutschLevel:req.params.deutchlvl,
    password:req.params.password
  });
  newUser.save(function(err,newUser){
    if(err)
    res.send(err);
    else
    res.send({status:200, message:'Users Added Successfully', userObj: newUser});
  });
 
});


//Add user by sending a user object in the body as json object
router.post('/addd', function(req, res, next) {
  let newUser = new usersModel({
    userName:req.body.userName,
    email:req.body.email,
    phone:req.body.phone,
    city:req.body.city,
    motherLanguage:req.body.motherLanguage,
    accntType:req.body.accntType,
    deutschLevel:req.body.deutschLevel,
    password:req.body.password
  });
  newUser.save(function(err,newUser){
    if(err)
    res.send(err);
    else
    res.send({status:200, message:'Users Added Successfully', userObj: newUser});
  });
 
});

//Get all Users
router.get('/list', function(req, res, next) {

  usersModel.find(function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200,resultsFound:response.length, users: response});
  });
 
});





/*
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
*/

//Search by name
router.get('/login', function(req, res, next) {

  const emailQuery = req.query.email;
  const passwordQuery = req.query.password;
  usersModel.find({email: emailQuery,password:passwordQuery},function(err,response){

    if(response.length==0){
      res.send('Incorrect Username and/or Password!');
    }
    else{
      res.send({status:200,resultsFound:response.length, users: response});
    }

    
  });
 
});


//Search by name
router.get('/searchByName', function(req, res, next) {

  const userNamequery = req.query.userName;
  usersModel.find({userName: userNamequery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200,resultsFound:response.length, users: response});
  });
 
});



//Find by ID
router.get('/searchById', function(req, res, next) {

  const idQuery = req.query.id;
  usersModel.findById(idQuery,function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, users: response});
  });
 
});


//Update test not used it'll update all collection depending on the query condition
router.put('/update', function(req, res, next) {

  const phoneQuery = req.query.phone;
  usersModel.update({userName:"kareem"},{phone:phoneQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, users: response});
  });
 
});


//Update spacific user in the query condition 
router.put('/updateuser', function(req, res, next) {

  const idQuery = req.query.id;
  const userNameQuery = req.query.userName;
  const phoneQuery = req.query.phone;
  const cityQuery = req.query.city;
  const deutschLevelQuery = req.query.deutschLevel;
  const passwordQuery = req.query.password;
  usersModel.findByIdAndUpdate(idQuery,{userName:userNameQuery,phone:phoneQuery,city:cityQuery,deutschLevel:deutschLevelQuery,password:passwordQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, users: response});
  });
 
});


//Find one and update //not used 
router.put('/updateoneuser', function(req, res, next) {

  const idQuery = req.query.id;
  const userNameQuery = req.query.userName;
  //const emailQuery = req.query.email;
  const phoneQuery = req.query.phone;
  const cityQuery = req.query.city;
  const deutschLevelQuery = req.query.deutschLevel;
  const passwordQuery = req.query.password;
  usersModel.findOneAndUpdate(idQuery,{userName:userNameQuery,phone:phoneQuery,city:cityQuery,deutschLevel:deutschLevelQuery,password:passwordQuery},function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, users: response});
  });
 
});



//DeleteUser
router.delete('/deleteuser', function(req, res, next) {

  const idQuery = req.query.id;
  usersModel.findByIdAndDelete(idQuery,function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, users: response});
  });
 
});







module.exports = router;
