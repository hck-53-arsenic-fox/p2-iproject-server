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
        subject: "purchasing",
        text: 'We could never take for granted the hard work you do. We see it, and we appreciate you'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });

}


module.exports = nodemailerHelper

