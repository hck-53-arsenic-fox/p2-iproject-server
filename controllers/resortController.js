const { Resort, User } = require('../models')
//? Geocoding
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })



class ResortController {

  //? Read All
  static async readResorts(req, res, next) {
    try {
      let data = await Resort.findAll(
        { include: [User] }
      )
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  //? Read One
  static async readOneResort(req, res, next) {
    try {
      let data = await Resort.findByPk(req.params.id, { include: [User] })
      if (!data) throw { name: "Data not found" }

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  //? Create Resorts
  static async createResort(req, res, next) {
    try {
      const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
      }).send()

      console.log(req.body);
      // console.log(geoData.body.features[0].geometry);
      let input = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,
        geometry:
          JSON.stringify({
            "type": "Point",
            "coordinates": [
              106.8333184799405,
              -6.193425194741608
            ]
          }),
        // geoData.body.features[0].geometry,
        imageUrl: req.file.path,
        UserId: req.user.id
      }
      console.log(req.file);
      console.log(input);

      // let data = await Resort.create(input)
      res.status(201).json(input)
    } catch (error) {
      next(error)
    }
  }














}

module.exports = ResortController