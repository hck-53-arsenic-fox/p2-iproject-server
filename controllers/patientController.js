
const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const {Patient, Appointment} = require('../models')
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const midtransClient = require('midtrans-client');



class PatientController{

    static async register(req, res, next){
        try {
            let { username, email, password, phoneNumber } = req.body;

            let patient = await Patient.create({
                username,
                email,
                password,
                phoneNumber,
              });

              res.status(201).json({
                id: patient.id,
                email
              });
        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res, next){
        try {
            let { email, password } = req.body;
            let patient = await Patient.findOne({ where: { email } });
            let compared = compareHash(password, patient.password);
            
            let payload = {
                id: patient.id,
                email
            };

            let access_token = createToken(payload);
            res.status(200).json({access_token})
        } catch (error) {
            console.log(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
                const ticket = await client.verifyIdToken({
                  idToken: req.headers.google_auth_token,
                  audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                  // Or, if multiple clients access the backend:
                  //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                });
                const payload = ticket.getPayload();
                const email = payload.email
                console.log(payload);
                const [patient, created ]= await Patient.findOrCreate({
                    where: {email},
                    defaults: {
                        username: payload.given_name,
                        email,
                        password: 'defaultpassword',
                    },
                    hooks: false
                })
                let access_token = createToken({
                    id: patient.id,
                    email
                });
                res.status(200).json({access_token, email})
                // If request specified a G Suite domain:
                // const domain = payload['hd'];
            
        } catch (error) {
            console.log(error);
            
        }
        
      } 
    
      static async fetchPatient(req, res, next){
        try {
            let id = req.user.id
            let data = await Patient.findByPk(id)
            res.status(200).json({email: data.email})
        } catch (error) {
            console.log(error);
        }
      }

      static async addAppointment(req, res, next){
        try {
            let doctorId = req.params.doctorId
            let patientId = req.user.id

            let {date, time} = req.body

            let appointment = await Appointment.create({DoctorId: doctorId, PatientId: patientId, date, time })
            console.log(appointment);
            res.status(201).json(appointment)
        } catch (error) {
            console.log(error);
        }
      }

      static async payment(req, res, next){
        try {
            let id = req.user.id
            const findPatient = await Patient.findByPk(id)

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : 'SB-Mid-server-ofT5sSGn9-l2xuOlDejj87Eo'
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "YOUR-ORDERID" + Math.floor(1000000 + Math.random() * 9000000),
                    "gross_amount": 250000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": findPatient.email
                    // "phone": "08111222333"
                }
            };

            let midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (error) {
            console.log(error);
        }
      }


}

module.exports = PatientController