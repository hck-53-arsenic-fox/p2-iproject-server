const nodemailer = require('nodemailer')

async function verification(email, link){
    // let testAcc = await nodemailer.createTestAccount()
    // console.log(testAcc);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "verify.iproject@gmail.com",
            pass: process.env.NODEMAILER_SECRET,
        }
    })

    let info = await transporter.sendMail({
        from: 'verify.iproject@gmail.com',
        to: email,
        subject: 'Verify your Account',
        text: `To activate your account, please click on this link ${link}`
    })
}

module.exports = {verification}