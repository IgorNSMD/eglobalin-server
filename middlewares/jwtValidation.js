const { response } = require('express')
const jwt = require('jsonwebtoken')

const jwtValidation = (req,res = response,next) => {

    // x-token headers
    const token = req.header('x-token')
    //console.log(token)

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'here is no token in the request...' 
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        //console.log(payload)
        
        req.uid = uid
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token...' 
        })
    }

    next()
}

module.exports = {
    jwtValidation  
}