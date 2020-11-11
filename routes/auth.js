//Ruta api/login

const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth');
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

router.post('/google', [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
);
module.exports = router;