const { Router } = require('express');
const { check, query } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('mail','El correo ingresado no es valido').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);



module.exports = router