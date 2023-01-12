const  Axios  = require("axios")

class ThirdApiController {
    static async catBengal(req, res, next) {
        try {
            const {data} = await Axios ({
                methods: 'GET',
                url: `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=beng&api_key=${process.env.CATBENGAL_SECRET}`
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}


module.exports = ThirdApiController