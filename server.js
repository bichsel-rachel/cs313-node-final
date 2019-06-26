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

app.use(express.static("public"))

//app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/form.html')))

//connect to Database
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

var sql = "SELECT * FROM users";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);


});     

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/login.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/getCategory', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});

app.get('/addTip', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});

app.get('/thumbUp', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});

app.get('/thumbDown', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/form.html'));
});

app.get('/getRate', function(req, res) {
let mail = req.query.mail;
let weight = req.query.weight;
let result = calculatRate(mail, weight);
        res.render('pages/getRate', {"result": result});
    });

app.listen(port, () => console.log(`Running on port ${port}!`))

//Model
let mail = "stamped";
let weight = 1;
console.log("1");
   
