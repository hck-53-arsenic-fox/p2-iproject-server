const nodemailer = require('nodemailer')


function nodemailerHelper(email) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abiaboyyy@gmail.com',
            pass: 'mdlouytwfvdnjedz'
        }
    });
    
    let mailOptions = {
        from: 'abiaboyyy@gmail.com',
        to: email,
        subject: "thank's for purchasing our product",
        text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });

}


module.exports = nodemailerHelper

