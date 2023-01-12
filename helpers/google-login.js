const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_SECRET)


async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_SECRET
    })

    const payload = ticket.getPayload()
    const email = payload.email

    return email
}



module.exports = {verify}




