//Ruta api/usuarios

const { Router } = require("express");
const { check } = require("express-validator");
const { addUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuario } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//getall
router.get("/", getUsuarios);
//id
router.get('/:id', getUsuario);
//agregar
router.post("/", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("email", 'El email es requerido').isEmail(),
    check("password", 'El password es requerido').not().isEmpty(),
    validarCampos,
], addUsuario);
//update
router.put("/:id", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("email", 'El email es requerido').isEmail(),
    check("password", 'El password es requerido').not().isEmpty(),
    validarCampos,
], updateUsuario);
//delete
router.delete('/:id', deleteUsuario)

module.exports = router;