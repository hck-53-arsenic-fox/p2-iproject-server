//Stay on app
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router)

app.use(errorHandler)


// on controller
// //? Geocoding
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

// //? Multer
// const multer = require('multer')
// const { storage } = require('./cloudinary/index')
// const upload = multer({ storage })








// //? Read All
// app.get('/resorts', async (req, res, next) => {
//   try {
//     let data = await Resort.findAll(
//       { include: [User] }
//     )
//     res.status(200).json(data)
//   } catch (error) {
//     next(error)
//   }
// })

// //? Modular Authentication
// const authentication = async (req, res, next) => {
//   try {
//     let { access_token } = req.headers
//     if (!access_token) throw { name: "Invalid token" }

//     let payload = jwt.verify(access_token, process.env.JWT_SECRET)

//     let user = await User.findByPk(payload.id)

//     req.user = { id: user.id }

//     if (!user) throw { name: "Invalid token" }
//     next()
//   } catch (error) {
//     next(error)
//   }
// }


// //? Create Resorts
// app.post('/resorts', authentication, upload.single('image'), async (req, res, next) => {
//   try {
//     const geoData = await geocoder.forwardGeocode({
//       query: req.body.location,
//       limit: 1
//     }).send()

//     console.log(req.body);
//     // console.log(geoData.body.features[0].geometry);
//     let input = {
//       title: req.body.title,
//       price: req.body.price,
//       description: req.body.description,
//       location: req.body.location,
//       geometry:
//         //  JSON.stringify({
//         //   "type": "Point",
//         //   "coordinates": [
//         //     106.8333184799405,
//         //     -6.193425194741608
//         //   ]
//         // }),
//         geoData.body.features[0].geometry,
//       imageUrl: req.file.path,
//       UserId: req.user.id
//     }
//     console.log(req.file);
//     console.log(input);

//     let data = await Resort.create(input)
//     res.status(201).json(data)
//   } catch (error) {
//     next(error)
//   }
// })

//* Other Social Media login
//Twitter


//*-------------------------------------------------------


// //? Read One
// app.get('/resorts/:id', async (req, res, next) => {
//   try {
//     let data = await Resort.findByPk(req.params.id, { include: [User] })
//     if (!data) throw { name: "Data not found" }

//     res.status(200).json(data)
//   } catch (error) {
//     next(error)
//   }
// })



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












app.listen(port, () => {
  console.log(`You're listening to ${port} FM`);
})


module.exports = router