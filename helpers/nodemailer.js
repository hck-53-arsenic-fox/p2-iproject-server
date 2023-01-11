const nodemailer = require('nodemailer')

const mailer = (userEmail) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'enakboyyy@gmail.com',
            pass: 'zsmdtowignpieutq'
        }
    });

    var mailOptions = {
        from: 'enakboyyy@gmail.com',
        to: userEmail,
        subject: 'Payment Success',
        text: `this is your Ticket ID: ${Math.floor(1000_000 + Math.random() * 9000_000)}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

module.exports = { mailer }