const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require('google-auth-library');

class ControllerUser {
    static async register(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const user = await User.create({ email, password, username });
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

    static async googleLogin(req, res, next) {
        try {
            // console.log(request, '<<<<<<<<<<<<<');
            console.log(req.headers.google_token);
            const id_token = req.headers.google_token;
            const client = new OAuth2Client('1071224371703-8noc4baa30srkagnt6rrnphu6cpk7hse.apps.googleusercontent.com');
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: '1071224371703-8noc4baa30srkagnt6rrnphu6cpk7hse.apps.googleusercontent.com',
            });
            const payload = ticket.getPayload();
            const { email, name } = payload;
            const [user, create] = await User.findOrCreate({
                where: { email },
                defaults: {
                    username: name,
                    email,
                    password: 'public',
                },
                hooks: false,
            });
            console.log(user);
            const access_token = generateToken({ id: user.id, email: user.email, username: user.username });
            res
                .status(200)
                .json({
                    access_token,
                    username: user.username,
                    email: user.email,
                });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }
}

module.exports = ControllerUser
