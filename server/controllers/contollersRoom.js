const {User, Room, Transaction, IdentityUser} = require("../models/index")

class Controller {
    static async fetchDataRoom(req, res, next){
        try {
            let data = await Room.findAll();
            res.status(200).json(data);
          } catch (error) {
            next(error);
          }
      }

      static async detailRoomById(req, res, next) {
        try {
          let { id } = req.params;
          let dataRoom = await Room.findByPk(id);
          if (!dataRoom) {
            throw { name: "NotFound" };
          }
          res.status(200).json( dataRoom );
        } catch (error) {
          next(error);
        }
      }
}

module.exports = Controller
