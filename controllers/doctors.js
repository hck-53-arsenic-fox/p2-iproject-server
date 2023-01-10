const{User, Doctor, Category, Transaction } = require('../models/index')

class DoctorController{
    static  async getAllDoctor(req, res){
        try {
            const data = await Doctor.findAll({
                attributes:{
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getDetailDoctor(req, res){
        try {
            const id = req.params.id
            const data = await Doctor.findOne({
                where:{id}, 
                include:{
                    model: Category,
                    attributes:{
                        exclude: ['createdAt', 'updatedAt']
                    },
                },
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                }
            })

            if(!data){
                throw{
                    name: 'notFound'
                }
            }

            res.status(200).json(data)
        } catch (error) {
            if(error.name === 'notFound'){
                res.status(404).json({message: 'Data not found'})
            } else {
                res.status(500).json({message: 'Internal server error'})
            }
        }
    }
}

module.exports = DoctorController