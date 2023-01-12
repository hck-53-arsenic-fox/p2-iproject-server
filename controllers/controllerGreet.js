const { Greets } = require("../models");

class Controller{    
    static async getGreet(req, res, next){
        try {
            let data = await Greets.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    
    static async addGreet(req, res, next){
        try {
            const UserId = req.params.id;
            const { guest, presence, greeting } = req.body
            let data = await Greets.create({ guest, presence, greeting, date: new Date(), UserId })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

}

module.exports = Controller