const { default: axios } = require("axios");

class ControllerWeather {
    static async getWeather(req, res, next) {
        try {
            // console.log(req.body);
            const { lat, lng } = req.body;
            // console.log(lat, lng);
            const options = {
                method: "GET",
                url: `https://dark-sky.p.rapidapi.com/${encodeURIComponent(
                    lat
                )},${encodeURIComponent(lng)}`,
                params: { units: "auto", lang: "en" },
                headers: {
                    "X-RapidAPI-Key":
                        "fb09e2e600mshc49247d9a15f1a6p1cbb72jsn83ad031385e8",
                    "X-RapidAPI-Host": "dark-sky.p.rapidapi.com",
                },
            };

            const data = await axios(options);
            // console.log(data);
            res.status(200).json(data.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ControllerWeather;
