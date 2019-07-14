const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;
const path = require('path')

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
  console.log("Password: ",password);
  

 insertInfo(fname, lname, username, email, password, (error, result) => {
  if (error || result == null) {
    res.status(500).json({success: false, data: error});
  }else{
    res.json(result);
  }
});
}

function insertInfo(fname, lname, username, email, password, callback) {

  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          password = hash;
           console.log("Hashed Pasword:",password);



           let sql = "INSERT INTO users (username, first_name, last_name, email, password) VALUES ('" + username + "', '" + fname + "', '" + lname + "', '" + email + "', '" + password + "')"; 
           console.log(sql);
       
           pool.query(sql, function(err, result) {
               if (err) {
                console.log('an error with db happened');
                console.log(err);
                callback(err,null);
               } else {
                  // Updated
                  console.log("Row inserted");
                  console.log("Password Updated with DB result: " + JSON.stringify(result.rows));
                  callback(null, result);

       
               }
           })

      });
  });

}


function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  console.log("Email: ",email);
    console.log("Password: ",password);

 checkUser(email, password, (error, result) => {
  if (error || result == null) {
    res.status(500).json({success: false, data: error});
  }else{
    req.session.id = result[0].id;
    console.log('req.session', req.session);
    res.json(result);
    }
});
}

function checkUser(email, password, callback) {

  //  const myPlaintextPassword = password;
  // const someOtherPlaintextPassword = 'not_bacon';
  console.log("Password CheckUser:",password);

  let sql = 'SELECT id, email, password FROM users WHERE email = $1';
  let params = [email];

  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);
    } else{
      bcrypt.compare(password, result.rows[0].password, function(err, res) {
        // res == true
            if(res) {
                // Passwords match
                console.log("Found DB result: " + JSON.stringify(result.rows));
                callback(null, result.rows);
            } else {
                // Passwords don't match
                console.log("An error with the DB occurred or host not found: " + err);
                //console.log(err);
                callback(err, null);
            } 
    });
    }

  });
};


function getCategoryDisplay(req, res) {
    let id = req.query.id;
   //console.log(id);

 	getCategory(id, (error, result) => {
    if (error || result == null) {
      res.status(500).json({success: false, data: error});
    }else{
      res.json(result);
    }
  });
}

function getCategory(id, callback) {
    // similar to PDO in PHP, $1::int gets back first data piece cleanly
    //let sql = 'SELECT * FROM tip WHERE id = $1::int';
    let sql = 'SELECT c.id, t.id AS tid, category_name, tip_title, tip_description, username, thumbs_up, thumbs_down FROM category c INNER JOIN tip t ON c.id = t.category_id INNER JOIN users u ON t.users_id = u.id WHERE c.id = $1::int';
    let params = [id];
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log('an error with db happened');
        console.log(err);
        callback(err,null);
      }
      
      callback(null, result.rows);
    });
  };

  function getThumbsUp(req, res) {
    let id = req.query.id;
    //console.log(id);
 
    updateThumbUp(id, (error, result) => {
     if (error) {
       res.status(500).json({success: false, data: error});
     }else{
       res.json({success: true});
     }
   });
  }

  // function to retrieve sql data from db with id
function updateThumbUp(id, callback) {
  let sql = 'UPDATE tip SET thumbs_up = thumbs_up + 1 WHERE id = $1';
  let params = [id];
  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);
    }
    //console.log('found db result: ' + JSON.stringify(result.rows[0]));
    callback(null, result.rows);
  });
};


function getThumbsDown(req, res) {
  let id = req.query.id;
  //console.log(id);

  updateThumbDown(id, (error, result) => {
   if (error) {
     res.status(500).json({success: false, data: error});
   }else{
     res.json({success: true});
   }
 });
}

// function to retrieve sql data from db with id
function updateThumbDown(id, callback) {
let sql = 'UPDATE tip SET thumbs_down = thumbs_down + 1 WHERE id = $1';
let params = [id];
pool.query(sql, params, (err, result) => {
  if (err) {
    console.log('an error with db happened');
    console.log(err);
    callback(err,null);
  }
  //console.log('found db result: ' + JSON.stringify(result.rows[0]));
  callback(null, result.rows);
});
};


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
  

 insertTip(users_id, category_id, tip_title, description, thumbs_up, thumbs_down, (error, result) => {
  if (error || result == null) {
    res.status(500).json({success: false, data: error});
  }else{
    res.json(result);
  }
});
}

function insertTip(users_id, cat_id, title, description, thumbs_up, thumbs_down, callback) {


           let sql = "INSERT INTO tip (users_id, category_id, tip_title, tip_description, thumbs_up, thumbs_down) VALUES ('" + users_id + "', '" + cat_id + "', '" + title + "', '" + description + "', '" + thumbs_up + "', '" + thumbs_down + "')"; 
           console.log(sql);
       
           pool.query(sql, function(err, result) {
               if (err) {
                console.log('an error with db happened');
                console.log(err);
                callback(err,null);
               } else {
                  // Updated
                  console.log("Row inserted");
                  console.log("Password Updated with DB result: " + JSON.stringify(result.rows));
                  callback(null, result);

       
               }
           })

      };


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
