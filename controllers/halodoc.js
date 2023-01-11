const axios = require("axios")
const {ROOT_URL} = require("../utils/options")

class halodocController{
    static async medicineCategories(req, res){
        try {
            const url = `${ROOT_URL}/api/v1/buy-medicine/categories`
            const category = await axios.get(url)
            return res.status(200).json(category.data)
        } catch (error) {
            console.log(error);
            res.status(400)
        }
    }

}

module.exports = halodocController