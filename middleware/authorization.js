const{ User, Transaction }= require('../models/index')

async function authorization(req, res, next) {
    try {
        let transaction = await Transaction.findByPk(req.params.id)
        if(!transaction) {
            throw {
                name: 'notFound'
            }
        } else {
                let UserId = transaction.UserId
                let id = req.user.id
                // console.log(req.user.role);
                // console.log(authorId);
                if(UserId === id) {
                    next()
                } else {
                    throw {
                        name: "Forbidden"
                    }
                }

        }
        
    } catch (error) {
        if(error.name === 'Forbidden'){
            res.status(403).json({message: 'Forbidden'})

        } else if(error.name === 'notFound'){
            res.status(404).json({message: 'Data not found'})
        } else{
            res.status(500).json({message: 'Intenal server error'})
        }
    }
}

module.exports = {authorization}