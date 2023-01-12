const midtransClient = require("midtrans-client");
let snap = new midtransClient.Snap({
     isProduction: false,
     serverKey: process.env.MIDTRANS_SECRET
});



module.exports = snap;
