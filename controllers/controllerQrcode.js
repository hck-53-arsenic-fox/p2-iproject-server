const axios = require("axios");

class controllerQrcode{
    static async generateQr(req,response){
        try {
            const { data } = await axios({
                method: 'POST',
                url: 'https://qrcode3.p.rapidapi.com/qrcode/text',
                headers: {
                  'content-type': 'application/json',
                  'X-RapidAPI-Key': '01dc05c276msh58f61db92de25b6p1f3dc5jsn59b3342b58a5',
                  'X-RapidAPI-Host': 'qrcode3.p.rapidapi.com'
                },
                // responseType: 'arraybuffer',
                data: `{"data":"${process.env.CLIENT_URL}/detail/${req.params.id}","image":{"uri":"icon://appstore","modules":true},"style":{"module":{"color":"black","shape":"default"},"inner_eye":{"shape":"default"},"outer_eye":{"shape":"default"},"background":{}},"size":{"width":200,"quiet_zone":4,"error_correction":"M"},"output":{"filename":"qrcode","format":"png"}}`
            })
              response.status(200).json(data)
        } catch (error) {
            // console.log(error);
            response.status(500).json({message:'Internal Server Error'})
        }
    }
}
module.exports=controllerQrcode