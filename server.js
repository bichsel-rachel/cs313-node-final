//index.js

require('dotenv').config();
const control = require('./controller.js');
const session = require('client-sessions');
const express = require('express')
const app = express()
const path = require('path')
const router = express.Router()
const port = process.env.PORT || 8888
const { Pool } = require('pg')


app.set('views', __dirname + '/views');
// set the view engine to ejs
app.set('view engine', 'ejs');

let math = 1000 * 60 * 60 * 24;

app.use(express.static("public"));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies
app.use(session({cookieName: 'session', secret: 'user-session', duration: math, activeDuration: math}));


//stylesheet
app.use('/stylesheets',express.static(__dirname +'/stylesheets'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/login.html')))

//connect to Database
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

app.post('/login', control.login);
app.post('/createUser', control.createUser);
app.get('/getCategory', control.getCategoryDisplay);
app.get('/thumbUp', control.getThumbsUp);
app.get('/thumbDown', control.getThumbsDown);
app.get('/logout', control.logout);
app.get('/verifyLogin', control.checkSession);
app.post('/addTip', control.addTipCont);



app.listen(port, () => console.log(`Running on port ${port}!`))

