//Ruta api/login

const { Router } = require('express');
const { login, googleSingIn, loginToken } = require('../bml/controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos')
const { validarJWT } = require('../bml/middlewares/validar-jwt')
const router = Router();

//login
router.post('/', [
        check('email', 'El email es obligatorio parse').isEmail(),
        check('password', 'El password es obligatorio pana').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google', [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
);

router.post("/renew", [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("token", "El token es obligatorio").not().isEmpty(),
    validarCampos,
], loginToken);
module.exports = router;