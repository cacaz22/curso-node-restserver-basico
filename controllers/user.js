const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/users');


const usuariosGet = async (req = request, res) => {

    // const {q, nombre = "no name", apikey, page = 1, limit} = req.query
    const {limit = 5, from = 0} = req.query;
    const query = { status: true };


    //comentarios 
        //codigo sin optimizar
            // const users = await User.find( query )
            //     .skip(from)
            //     .limit(limit);
            // const total = await User.countDocuments( query )
        // a fernando le exploto la app por que no recibia un numero sino un string a mi no me paso eso
        //el explico pasarlo por Number(limit) para arreglarlo
        //qs.ParsedQs
        //me explota al ingresar algo que no sea un numero ( ej:letras) asi que valide mediante el express-validator el querry
        //query("limit", "limit debe ser un numero")
        //.isNumeric()
        //.optional(),
        //validar-campos

    const [users, total] = await Promise.all([
        User.find( query )
        .skip(from)
        .limit(limit),
        User.countDocuments( query )
    ])    


    res.json({
        total,
        users
    })
}

const usuariosPost = async (req, res) => {
    

    const {name, password, mail, role} = req.body;
    const user = new User({name, password, mail, role});

    //verificar si existe el correo

    // const existeMail = await User.findOne({mail});
    // if (existeMail){
    //     return res.status(400).json({
    //         msg: 'ya existe registro de una cuenta con el email ingresado'
    //     });
    // }

    //encriptar contraseña
    
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    //guardar en  BD
    await user.save()

    res.json({
        msg: 'post API - controlador',
        user
    })
}

const usuariosPut = async (req, res) => {
    const {id} = req.params
    const {_id, password, google, mail, ...rest} = req.body; 
    
    if (password) {
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user)
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = async (req, res) => {

    const {id} = req.params;

    //borrar fisicamente

    // const user = await User.findByIdAndDelete( id )

    const user = await User.findByIdAndUpdate(id, {status:false});


    res.json({
        user
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}