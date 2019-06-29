//index.js

require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const port = process.env.PORT || 8888
const { Pool } = require('pg')


app.set('views', __dirname + '/views');
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static("public"));

//stylesheet
app.use('/stylesheets',express.static(__dirname +'/stylesheets'));

//app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/form.html')))

//connect to Database
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

// var sql = "SELECT * FROM users";

// pool.query(sql, function(err, result) {
//     // If an error occurred...
//     if (err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result:");
//     console.log(result.rows);


// });     

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname+'/public/login.html'));
// });

// app.get('/login', function(req, res) {
//     res.sendFile(path.join(__dirname+'/public/index.html'));
// });

app.get('/getCategory', function(req, res) {
   let id = req.query.id;
   //console.log(id);

 	getCategory(id, (error, result) => {
    if (error || result == null) {
      res.status(500).json({success: false, data: error});
    }else{
      res.json(result[0]);
      // let id = result[0].id;
      // let fname = result[0].first_name;
      // let tip = result[0].tip_title;
      // let description = result[0].tip_description;
      // let params = {id: id, fname: fname, tip: tip, description: description };
      // console.log(params);
    }
  });
});

// function to retrieve sql data from db with id
function getCategory(id, callback) {
    // similar to PDO in PHP, $1::int gets back first data piece cleanly
    //let sql = 'SELECT * FROM tip WHERE id = $1::int';
    let sql = 'SELECT c.id, category_name, tip_title, tip_description, username, thumbs_up, thumbs_down FROM category c INNER JOIN tip t ON c.id = t.category_id INNER JOIN users u ON t.users_id = u.id WHERE c.id = $1::int';
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

app.get('/addTip', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});

app.get('/thumbUp', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});

app.get('/thumbDown', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});


app.listen(port, () => console.log(`Running on port ${port}!`))


   
