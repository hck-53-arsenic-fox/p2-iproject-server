const nodemailer = require("nodemailer");

function sendEmail(emailSend, name, dataId) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dhiaulhaqreza@gmail.com",
            pass: "cfyttisuwqnwtzpx",
        },
        debug: true,
        logger: true,
    });

    let details = {
        from: "dhiaulhaqreza@gmail.com",
        to: emailSend,
        subject: `Halo ${name}!, Pembelian Kamu berhasil`,
        text: "Selamat ${name}!, kamu berhasil membeli sprei dengan id ${dataId}",
    };

    transporter.sendMail(details, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("KEKIRIM!!!");
        }
    });
}

module.exports = sendEmail;
