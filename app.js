const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

const { User, Resort } = require('./models/index');


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//? Register
app.post('/register', async (req, res, next) => {
  try {

  } catch (error) {

  }
})


//? Login
app.post('/login', async (req, res, next) => {
  try {

  } catch (error) {

  }
})


//? Read All
app.get('/resorts', async (req, res, next) => {
  try {

  } catch (error) {

  }
})



//? Read One
app.get('/resorts/:id', async (req, res, next) => {
  try {

  } catch (error) {

  }
})



//! Uthentication
app.use(async (req, res, next) => {
  try {

  } catch (error) {

  }
})



//? Add new Resort
//? View own resorts



//*--- Use API first
//? 
//?








//! Error Handler
app.use((err, req, res, next) => {
  let statusCode = 500
  let message = 'Internal Server Error'




  res.status(statusCode).json({ message })
})




app.listen(port, () => {
  console.log(`You're listening to ${port} FM`);
})