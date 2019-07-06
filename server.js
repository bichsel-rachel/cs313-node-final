//index.js

require('dotenv').config();
const control = require('./controller.js');

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

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/login.html')))

//connect to Database
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

app.get('/login', control.login);
app.get('/createUser', control.createUser);
app.get('/getCategory', control.getCategoryDisplay);
app.get('/thumbUp', control.getThumbsUp);
app.get('/thumbDown', control.getThumbsDown);


// app.get('/addTip', function(req, res) {
//     res.sendFile(path.join(__dirname+'/public/form.html'));
// });



app.listen(port, () => console.log(`Running on port ${port}!`))


   
