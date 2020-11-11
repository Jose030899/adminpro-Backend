//Ruta api/login

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router();

//login
router.post('/', [
        check('email', 'El email es obligatorio parse').isEmail(),
        check('password', 'El password es obligatorio pana').not().isEmpty(),
        validarCampos
    ],
    login
);

module.exports = router;