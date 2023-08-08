const Role = require('../models/role')
const User = require('../models/users');

const isValidRole = async (role = "") =>{
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`el rol ${role} no esta registrado en la base de datos`)
    }}

const emailExist = async (mail = "") => {
    const existeMail = await User.findOne({mail});
    if (existeMail){
        throw new Error('El email ingresado ya existe')        
    }
}   

const nameExistById = async (id) => {
    const existUser = await User.findById(id);
    if (!existUser){
        throw new Error(`El id no existe ${id}`)        
    }
}   

module.exports = {
    isValidRole,
    emailExist,
    nameExistById
};

