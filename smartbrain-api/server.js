const express = require('express');
const bodyParser = require('body-parser');
const bCrypt = require('bcryptjs');
const knex = require('knex');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profileget');
const image = require('./controllers/image');


const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'smartbrain'
  }
});

app.get('/', (req,res)=>{
	res.send("this is working")
})

app.get('/profile/:id', (req,res) => {profile.profileget(req, res, db)})

app.put('/image', (req,res) => {image.imageHandler(req, res, db)})

app.post('/imageProcessor', (req, res) => {image.imageProcessor(req,res)})

app.post('/signin', (req,res) => {signin.signinHandler(req,res,db,bCrypt)} )

app.post('/register', (req,res) => {register.registerUser(req,res,db,bCrypt)});

app.listen(3001,()=>console.log("listening on port 3001"))
