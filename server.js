//dependencies
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
//controllers
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const clarifaiAPI = require('./controllers/clarifaiAPI.js')
//Object assignments
const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', //localhost
      user : '', //add your user name for the database here
      password : '', //add your correct password in here
      database : 'smartbrain' //add your database name you created here
    }
});

const app = express();

//Middelware in use:
app.use(express.json());
app.use(cors())



// /--> root route
app.get('/', (req, res) => {
    res.send('GOT EM');
})

// signin route -- Endpoint sign in --
app.post('/signin', (req, res) => {signin.handleLogin(req, res, db, bcrypt)})

//Register
app.post('/register', (req, res) => {register.handlingRegister(req,res ,db , bcrypt)}) 

//profile
app.get('/profile/:id', (req, res) => {profile.getProfile(req, res, db)})

//Update user and Image count
app.put('/image', (req, res) => {profile.updateImageCount(req, res, db)})

//Move and respond with clarifai API on the back-end (security)
app.post('/imageClarifai', (req, res) => {clarifaiAPI.handleClarifai(req, res)})



app.listen(3000, () => {
    console.log('app is running')
})


/*
/ --> res = working
/ --> signin --> POST = success/fail 
/register --> POST = user (object)
/profile/:userId --> GET = user
/image --> PUT --> user

*/