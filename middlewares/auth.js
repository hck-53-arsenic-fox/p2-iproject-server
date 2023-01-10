const { Customer } = require("../models/index");
const { decodeToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        const access_token = req.headers.access_token;
        if (!access_token) {
            throw { name: "Unauthenticated" };
        }
        const payload = decodeToken(access_token);
        const customer = await Customer.findOne({
            where: {
                email: payload.email,
            },
        });
        if (!customer) {
            throw { name: "Unauthenticated" };
        }
        req.user = {
            id: customer.id,
            name: customer.name,
            email: customer.email,
        };
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authentication };
