var admin = require("firebase-admin");

var serviceAccount = require("../h8-iproject-firebase-adminsdk-ehjj1-2ff65bc1da.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {admin}