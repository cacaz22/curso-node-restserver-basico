const { request } = require("express");
const { response } = require("express");


const esAdminRole = (req = request, res = response, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg:'se quiere verificar el rol sin validar el token primero'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`el usuario ${ name } no es administrador - no puede hacer esto`
        })
    }

    next();
}

const tieneRole = (...roles)=>{

    return (req = request, res = response, next) =>{

        if(!req.user){
            return res.status(500).json({
                msg:'se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`el servicio requiere uno de los siguientes roles ${roles}`
            })
        }

        next();
    }
    
}


module.exports = {
    esAdminRole,
    tieneRole
}
