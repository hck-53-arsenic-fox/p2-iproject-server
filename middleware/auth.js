
const { decodeToken } = require('../helpers/jwt');
const {Patient} = require('../models')


async function authentication (req, res, next){
    try{
        let access_token = req.headers.access_token
        console.log(access_token);
        if(!access_token){
            throw { name: 'Unauthenticated'}
        }
        
        let payload = decodeToken(access_token)
        console.log(payload, '<<<payload');
        let patient = await Patient.findByPk(payload.id)
        // console.log(patient);

        if(patient) {
            req.user = {id: patient.id, name: patient.username}
            // console.log(user);
            next()
        }else{
            throw {name: "Unauthenticated"}
        }
    }catch (err){
        console.log(err);

    }
}

module.exports = authentication