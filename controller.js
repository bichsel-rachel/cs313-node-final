//controller

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;
const path = require('path')
const model = require('./model.js');

const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');

const saltRounds = 10;

function createUser(req, res) {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  console.log("First Name: ",fname);
  console.log("Last Name: ",lname);
  console.log("Username: ",username);
  console.log("email: ",email);
  // console.log("Password: ",password);
  
  if (fname == "" || lname == "" || username == "" || email == "" || password == ""){
    console.log("Empty input fields. New user not created.")
    res.json({success: false});
  }
  else {
  model.insertInfo(fname, lname, username, email, password, (error, result) => {
    if (error || result == null) {
      res.status(500).json({success: false, data: error});
    }else{
      // res.json(result);
      res.json({success: true, data: result});
      }
    });
  }
}


function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  console.log("Email: ",email);
    // console.log("Password: ",password);

 model.checkUser(email, password, (error, result) => {
  if (error || result == null) {
    if (error == 1) {
      res.json({success: false});
    }else {
       res.status(500).json({success: false, data: error});
    }
  }
  else{
    req.session.id = result[0].id;
    console.log('req.session', req.session);
    res.json({success: true, data: result});
    }
});
}


function getCategoryDisplay(req, res) {
    let id = req.query.id;
   //console.log(id);

 	model.getCategory(id, (error, result) => {
    if (error || result == null) {
      res.status(500).json({success: false, data: error});
    }else{
      res.json(result);
    }
  });
}

  function getThumbsUp(req, res) {
    let id = req.query.id;
    //console.log(id);
 
    model.updateThumbUp(id, (error, result) => {
     if (error) {
       res.status(500).json({success: false, data: error});
     }else{
       res.json({success: true});
     }
   });
  }


function getThumbsDown(req, res) {
  let id = req.query.id;
  //console.log(id);

  model.updateThumbDown(id, (error, result) => {
   if (error) {
     res.status(500).json({success: false, data: error});
   }else{
     res.json({success: true});
   }
 });
}


function logout(req, res){
 req.session.destroy();
 res.json({success: "logged out"});
}

function checkSession(req, res){
  if(req.session.id){
    res.json({result: "TRUE"});
  } else {
      res.json({result: null});
  }
}

function addTipCont(req, res) {
  let users_id = req.session.id;
  let category_id = req.body.cid;
  let tip_title = req.body.tipTitle;
  let description = req.body.description;
  let thumbs_up = 0;
  let thumbs_down = 0;
 
  console.log("Test:", tip_title);
  console.log("User Id: ", users_id);
  console.log("Category Id: ", category_id);
  console.log("Description: ",description);
  

model.insertTip(users_id, category_id, tip_title, description, thumbs_up, thumbs_down, (error, result) => {
  if (error || result == null) {
    res.status(500).json({success: false, data: error});
  }else{
    res.json(result);
  }
});
}


  module.exports = {
     login: login
  ,  createUser: createUser
  ,  getCategoryDisplay: getCategoryDisplay
  ,  getThumbsUp: getThumbsUp
  ,  getThumbsDown: getThumbsDown
  ,  logout: logout
  ,  checkSession: checkSession
  ,  addTipCont: addTipCont
  }
