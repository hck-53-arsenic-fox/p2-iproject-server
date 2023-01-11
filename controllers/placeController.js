const axios = require("axios");

class ControllerPlace {
    static async getPlaces(req, res, next) {
        try {
            const { type, bl_latitude, tr_latitude, bl_longitude, tr_longitude } = req.body;
            // console.log(req.params, 'req params');
            // console.log(req.body);
            // const { boundaries } = req.query
            // console.log(type, boundaries);
            const placeUrl = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
            const options = {
                params: {
                    bl_latitude,
                    tr_latitude,
                    bl_longitude,
                    tr_longitude,
                    currency: "IDR",
                },
                headers: {
                    "X-RapidAPI-Key":
                        "fb09e2e600mshc49247d9a15f1a6p1cbb72jsn83ad031385e8",
                    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
                },
            };
            const places = await axios.get(placeUrl, options)
            // console.log(places);
            res.status(200).json(places.data.data)
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ControllerPlace
