const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class ControllerUser {
    static async register(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const user = await User.create({ email, password });
            res.status(201).json({ id: user.id, email: user.email, name: user.name });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw { name: "InvalidEmailPassword" };
            } else if (!comparePassword(password, user.password)) {
                throw { name: "InvalidEmailPassword" };
            } else {
                const access_token = generateToken({ id: user.id, email: user.email });
                res.status(200).json({ access_token });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ControllerUser
