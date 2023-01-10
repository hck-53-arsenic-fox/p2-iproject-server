const axios = require("axios");

class controllerQrcode{
    static async generateQr(req,response){
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'https://qrcode3.p.rapidapi.com/qrcode/text',
                headers: {
                  'content-type': 'application/json',
                  'X-RapidAPI-Key': 'df882b3492mshe79e40ba2445ecep1e03e5jsn271c6c8d22a5',
                  'X-RapidAPI-Host': 'qrcode3.p.rapidapi.com'
                },
                data: '{"data":"https://linqr.app","image":{"uri":"icon://appstore","modules":true},"style":{"module":{"color":"black","shape":"default"},"inner_eye":{"shape":"default"},"outer_eye":{"shape":"default"},"background":{}},"size":{"width":200,"quiet_zone":4,"error_correction":"M"},"output":{"filename":"qrcode","format":"png"}}'
            })
              response.status(200).json(data)
        } catch (error) {
            response.status(500).json({message:'Internal Server Error'})
        }
    }
}
module.exports=controllerQrcode