const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const {Doctor, Profile, Appointment, Patient} = require('../models')
const {Op} = require('sequelize')

class DoctorController{

    static async login(req, res, next){
        try {
            let { email, password } = req.body;
            let doctor = await Doctor.findOne({ where: { email } });
            let compared = compareHash(password, doctor.password);
            
            let payload = {
                id: doctor.id,
                email
            };

            let access_token = createToken(payload);
            res.status(200).json({access_token})
        } catch (error) {
            console.log(error);
        }
    }

    static async fetchDoctor(req, res, next){
        try {
            const {search} = req.query
            const paramQuerySQL = {};

            if (search !== "" && typeof search !== "undefined") {
                const query = search
                console.log(query, 'dah masuk');
                paramQuerySQL.where = {
                  specialization: { [Op.iLike]: `%${query}%` },
                };
              }

            let data = await Profile.findAll(paramQuerySQL)
            console.log(data);
            res.status(200).json(data)

        } catch (error) {
            console.log(error);
        }
    }

    static async findDoctor(req, res, next){
        try {
            let doctorId = req.user.id
            let data = await Doctor.findOne({
                where:{
                    id: doctorId
                },
                include:{
                    model: Profile,
                    as: 'Profile'
                }
            })
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async findAppointment(req, res, next){

        try {
            let doctorId = req.user.id
            let data = await Appointment.findOne({
            where:{DoctorId: doctorId },
            include:{
                model: Patient,
                as: 'Patient',
            }
        })
        res.status(200).json({data})
        } catch (error) {
            console.log(error);
        }

        
    }
}

module.exports = DoctorController