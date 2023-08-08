
const { Router } = require('express');
const { check, query } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { isValidRole, emailExist, nameExistById } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');

const router = Router();

router.get('/', [
    query("limit", "limit debe ser un numero")
    .isNumeric()
    .optional(),
    query("from", "from debe ser un numero")
    .isNumeric()
    .optional(),
    validarCampos
] ,usuariosGet);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom( nameExistById ),
    check("role").custom( isValidRole ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener 6 caracteres minimo').isLength({min:6}),
    check('mail','El correo ingresado no es valido').isEmail(),
    check('mail').custom( emailExist ),
    check("role").custom( isValidRole ),
    validarCampos
    // check('role','No es un rol valido').isIn(["ADMIN_ROLE","USER_ROLE"]),
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id').custom( nameExistById ),
    validarCampos
] ,usuariosDelete);



module.exports = router;