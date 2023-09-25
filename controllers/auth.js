const { response } = require("express");
const User = require("../models/users")
const bcryptjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");

const login = async (req, res = response) =>{

    const {mail, password} = req.body;

    try {

        // verificar si existe email
        const user = await User.findOne({mail})
        if(!user){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - email'
            });
        }
        // verificar si el usuario esta activo

        if(!user.status){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - status:false'
            });
        }

        // verificar contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        // generar el jwt

        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        });
    }




}

module.exports = {
    login
}