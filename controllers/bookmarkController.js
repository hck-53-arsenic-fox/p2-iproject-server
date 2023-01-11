const { Bookmark } = require('../models');

class ControllerBookmark {
    static async getBookMark(req, res, next) {
        try {
            const data = await Bookmark.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addBookMark(req, res, next) {
        try {
            const { name, type, image_url, website, trip_advisor, price, ranking } = req.body
            const UserId = req.user.id
            const location_id = req.params.location_id
            const data = await Bookmark.create({
                name,
                type,
                UserId,
                image_url,
                website,
                trip_advisor,
                price,
                ranking,
                location_id
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteBookMark(req, res, next) {
        try {
            const location_id = req.params.location_id
            const data = await Bookmark.destroy({
                where: {
                    location_id
                }
            })
            res.status(200).json({ message: 'Bookmark deleted' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerBookmark