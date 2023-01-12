const nodemailer = require("nodemailer");

module.exports = {
    send: async ( email ) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'localhost160496@gmail.com',
                pass: 'mvdqezlmopvraiwa'
            }
        })

        let mailOptions = {
            from: 'admin@gmail.com',
            to: email,
            subject: 'thank you for register',
            text: 'semoga harimu menyenangkan :)'
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log( err );
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}