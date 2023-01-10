const { json, where } = require('sequelize')
const{User, Doctor, Category, Transaction } = require('../models/index')

class TransactionController{
    static async bookingDoctor(req, res){
        try {
            const id = req.params.doctorId
            const {name, date} = req.body
            const dataDoctor = await Doctor.findByPk(id)
            if(!dataDoctor){
                throw{
                    name: 'notFound'
                }
            }
            const dataTransaction = await Transaction.findOne({where:{UserId: req.user.id, DoctorId: id}})
            if(dataTransaction){
                throw{
                    name: 'dataAlready'
                }
            }
            const data = await Transaction.create({name, date, UserId: req.user.id, DoctorId: id})
            res.status(201).json(data)
        } catch (error) {
            // console.log(error);
            if(error.name === 'notFound'){
                res.status(404).json({message: 'Data not found'})
            } else if(error.name === 'dataAlready') {
                res.status(400).json({message: 'Data Already Exists'})
            } else if(error.name === 'SequelizeValidationError'){
                res.status(400).json({message: `${error.errors[0].message}`})
            } else{
                res.status(500).json({message: 'Internal server error'})
            }
            
        }
    }

    static async getAllTransaction(req, res){
        try {
            const data = await Transaction.findAll({
                where:{UserId: req.user.id},
                include:{
                    model: Doctor,
                    attributes:{
                        exclude:['createdAt', 'updatedAt']
                    }
                },
                attributes:{
                    exclude:['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(500),json({message: 'Internal server error'})
        }
    }

    static async detailTransaction(req, res){
        try {
            const id = req.params.id
            const data = await Transaction.findOne({where:{id}, include:{model: Doctor}})
            res.status(200).json(data)
        } catch (error) {
            res.status(500),json({message: 'Internal server error'})
        }
    }

    static async deleteData(req, res){
        try {
            const id = req.params.id
            const dataTransaction = await Transaction.findByPk(id)
            if(!dataTransaction){
                throw{
                    name: 'notFound'
                }
            }
    
            const data = Transaction.destroy({where:{id}})
            res.status(200).json({message: 'Success'})
        } catch (error) {
            res.status(500),json({message: 'Internal server error'})
        }
    }

    static async editForm(req, res){
        try {
            let id = req.params.id
            let {name, date} = req.body
            const dataTransaction = await Transaction.findByPk(id)
            if(!dataTransaction){
                throw{
                    name: 'notFound'
                }
            }
            const data = await Transaction.update({name, date}, {where:{id}})
            res.status(201).json({message: 'success edited'})
        } catch (error) {
            // console.log(error);
            if(error.name === 'notFound'){
                res.status(404).json({message: 'Data not found'})
            } else if(error.name === 'SequelizeValidationError'){
                res.status(400).json({message: `${error.errors[0].message}`})
            } else{
                res.status(500).json({message: 'Internal server error'})
            }
        }
    }

}

module.exports = TransactionController