const router = require('express').Router()
const Users = require('../controllers/user')
const midtransClient = require('midtrans-client');
const { User } = require('../models')

router.post('/register', Users.register )
router.post('/login', Users.login )
router.get('/anime', Users.anime )
router.post('/generate-midtrans-token', async ( req, res ) => {
    try {
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-J3dzjIWb7s3SzCpfaZ85QWJR'
        });

        let parameter = {
            "transaction_details": {
                "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() + 9000000),
                "gross_amount": 10000000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };

        let midtransToken = await snap.createTransaction(parameter)
        res.status(200).json(midtransToken)
           

    } catch( err ) {
        console.log( err );
    }

})
module.exports = router