//model

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;
const path = require('path')
const model = require('./model.js');

const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');

const saltRounds = 10;


function insertInfo(fname, lname, username, email, password, callback) {

  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in your password DB.
          password = hash;
          //  console.log("Hashed Pasword:",password);



           let sql = "INSERT INTO users (username, first_name, last_name, email, password) VALUES ('" + username + "', '" + fname + "', '" + lname + "', '" + email + "', '" + password + "')"; 
          //  console.log(sql);
       
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

function checkUser(email, password, callback) {

  //  const myPlaintextPassword = password;
  // const someOtherPlaintextPassword = 'not_bacon';
  // console.log("Password CheckUser:",password);

  let sql = 'SELECT id, email, password FROM users WHERE email = $1';
  let params = [email];

  pool.query(sql, params, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);}
    else if ( result.rows.length == 0) {
      callback(1, "data didn't exist");
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

function insertTip(users_id, cat_id, title, description, thumbs_up, thumbs_down, callback) {


          //  let sql = "INSERT INTO tip (users_id, category_id, tip_title, tip_description, thumbs_up, thumbs_down) VALUES ('" + users_id + "', '" + cat_id + "', '" + title + "', '" + description + "', '" + thumbs_up + "', '" + thumbs_down + "')"; 
           let sql = "INSERT INTO tip (users_id, category_id, tip_title, tip_description, thumbs_up, thumbs_down) VALUES ($1, $2, $3, $4, $5, $6)"; 
           let values = [users_id, cat_id, title, description, thumbs_up, thumbs_down];
           console.log(sql);
       
           pool.query(sql, values, function(err, result) {
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
     insertInfo: insertInfo
  ,  checkUser: checkUser
  ,  getCategory: getCategory
  ,  updateThumbUp: updateThumbUp
  ,  updateThumbDown: updateThumbDown
  ,  insertTip: insertTip
  }