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
    if (!req.body.email) throw { name: "Email is required" }
    if (!req.body.password) throw { name: "Password is required" }
    if (!req.body.username) throw { name: "Username is required" }

    let input = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      username: req.body.username
    }

    let user = await User.create(input)
    res.status(201).json({
      id: user.id,
      email: user.email,
      username: user.username
    })
  } catch (error) {
    next(error)
  }
})


//? Login
app.post('/login', async (req, res, next) => {
  try {
    if (!req.body.email) throw { name: "Email is required" }
    if (!req.body.password) throw { name: "Password is required" }

    let user = await User.findOne({
      where: { email: req.body.email }
    })

    if (!user) throw { name: "Invalid email or password" }

    let isMatch = bcrypt.compareSync(req.body.password, user.password)

    if (!isMatch) throw { name: "Invalid email or password" }

    let access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

    res.status(200).json({ access_token })
  } catch (error) {
    next(error)
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
    next(error)
  }
})

//? Modular Authentication
const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    console.log(req.headers);
    console.log(access_token);
    if (!access_token) throw { name: "Invalid token" }
    console.log(access_token);

    let payload = jwt.verify(access_token, process.env.JWT_SECRET)

    let user = await User.findByPk(payload.id)

    req.user = { id: user.id }

    console.log(user);
    if (!user) throw { name: "Invalid token" }
    next()
  } catch (error) {
    console.log(error);
    next(error)
  }
}


//? Create Resorts
app.post('/resorts', upload.single('image'), authentication, async (req, res, next) => {
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
      UserId: req.user.id
    }
    let data = await Resort.create(input)
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
})

//? Read One
app.get('/resorts/:id', async (req, res, next) => {
  try {
    let data = await Resort.findByPk(req.params.id, { include: [User] })
    if (!data) throw { name: "Data not found" }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})



//! Authorization
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
  console.log(err);
  let statusCode = 500
  let message = 'Internal Server Error'

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400
    message = err.errors[0].message
  }
  else if (err.name === 'Email is required' || err.name === "Password is required" || err.name === "Username is required") {
    statusCode = 400
    message = err.name
  }
  else if (err.name === 'Invalid email or password') {
    statusCode = 401
    message = err.name
  }
  else if (err.name === 'Data not found') {
    statusCode = 404
    message = err.name
  }
  else if (err.name === 'Invalid token') {
    statusCode = 401
    message = err.name
  }




  res.status(statusCode).json({ message })
})




app.listen(port, () => {
  console.log(`You're listening to ${port} FM`);
})