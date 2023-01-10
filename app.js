const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


//? Geocoding
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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
    let data = await Resort.findAll(
      { include: [User] }
    )
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
  }
})

//? Create Resorts
app.post('/resorts', upload.single('image'), async (req, res, next) => {
  try {
    const geoData = await geocoder.forwardGeocode({
      query: req.body.location,
      limit: 1
    }).send()

    console.log(geoData.body.features[0].geometry);
    let input = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      location: req.body.location,
      geometry: geoData.body.features[0].geometry,
      imageUrl: req.body.imageUrl,
      UserId: req.body.UserId
    }
    let data = await Resort.create(input)

  } catch (error) {
    console.log(req.body);
    console.log(error);
  }
})

//? Read One
app.get('/resorts/:id', async (req, res, next) => {
  try {
    let data = await Resort.findByPk(req.params.id, { include: [User] })
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
  }
})



//! Uthentication
app.use(async (req, res, next) => {
  try {

  } catch (error) {

  }
})







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