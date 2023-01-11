async function authorization(req,res,next){
    try {
        console.log(req.user.status);
        if(req.user.role !== "Subscribe"){
            throw {name: "AccessTokenInvalid"}
        }
            next()
        
    } catch (error) {
        next(error)
        
    }
}

module.exports = authorization