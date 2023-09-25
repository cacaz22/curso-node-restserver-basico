const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users')


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:"acceso rechazado - no hay token en la peticion"
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        //leer usuario que corresponde al uid
        const user = await User.findById(uid);

        if (!user){
            return res.status(401).json({
                msg:"token no valido - usuario no existe en db"
            })
        }

        //verificar si el uid tiene estado en true 
        if(!user.status){
            return res.status(401).json({
                msg:"token no valido - usuario no activo"
            })
        }


        req.user = user;
        next()
    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: "acceso rechazado - token invalido"
        })
    }


}

module.exports = {
    validarJWT
}
