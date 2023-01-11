const nodemailer = require("nodemailer");
const formatRupiah = require("./changeMoney")

function sendEmail(email, price){
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nabilusnup@gmail.com',
        pass: 'pqpmsjeqffktukxr'
    }
});

let mailOptions = {
    from: 'nabilusnup@gmail.com',
    to: email,
    subject: 'Confirmed Your Payment was Successfully!',
    html: `
    ===================================
    <h2>Hola, ${email}</h2> 
    ===================================
    <h3> Your Payment has been successfully! </h3>
    ===================================
    <h4> Your order has been confirmed, </h4>
    <h4> Thankyou for choosing BlackDoorz for your best place staycation. </h4>
    ===================================
    <h4> Payment successfully paid in the amount of <span>${formatRupiah(price)}</span></h4>
    ===================================
    <h4>Thank you :)</h4>
    <h4>-BlackDoorz Team-</h4>
    `
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});
}

module.exports = { sendEmail };