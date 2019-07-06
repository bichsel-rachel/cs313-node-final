const port = process.env.PORT || 8888
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

function createUser(req, res) {
  let fname = req.query.fName;
  let lname = req.query.lName;
  let username = req.query.username;
  let email = req.query.email;
  let password = req.query.password;
  

 insertInfo(fname, lname, username, email, password, (error, result) => {
  if (error || result == null) {
    res.status(500).json({success: false, data: error});
  }else{
    res.json(result);
    res.sendFile(path.join(__dirname+'/public/login.html'));
  }
});
}

function insertInfo(fname, lname, username, email, password, callback) {
  let sql = "INSERT INTO users (username, first_name, last_name, email, password) VALUES ('" + username + "', '" + fname + "', '" + lname + "', '" + email + "', '" + password + "')"; 
  console.log(sql);
  pool.query(sql, (err, result) => {
    if (err) {
      console.log('an error with db happened');
      console.log(err);
      callback(err,null);
    }
    console.log("Row inserted");
  });
};

function login(req, res) {
  let email = req.query.email;
 //console.log(id);

 checkUser(email, (error, result) => {
  if (error || result == null) {
    res.status(500).json({success: false, data: error});
  }else{
    res.json(result);
    res.sendFile(path.join(__dirname+'/public/category.html'));
  }
});
}

function checkUser(email, callback) {
  let sql = 'SELECT id, username, email, password FROM users WHERE email = $1 AND password = $2';
  let params = [email];
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
      //console.log('found db result: ' + JSON.stringify(result.rows[0]));
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

  module.exports = {
     login: login
  ,  createUser: createUser
  ,  getCategoryDisplay: getCategoryDisplay
  ,  getThumbsUp: getThumbsUp
  ,  getThumbsDown: getThumbsDown
  }
