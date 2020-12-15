//Ruta api/docentes
const { Router } = require("express");
const { check } = require("express-validator");
const { getDocentes, getDocente, addDocentes, updateDocente, deleteDocente } = require("../bml/controllers/docentes");
const { validarCampos } = require("../bml/middlewares/validar-campos");

const router = Router();

//getall
router.get("/", getDocentes);


//getbyid
router.get('/:id', getDocente);

//Add
//agregar
router.post("/", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("edad", 'La edad es requerida').not().isEmpty(),
    check("titulo", 'El titulo es requerido').not().isEmpty(),
    check("tipo", 'El tipo es requerido').not().isEmpty(),
    validarCampos,
], addDocentes);


//update
router.put("/:id", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("edad", 'La edad es requerida').not().isEmpty(),
    check("titulo", 'El titulo es requerido').not().isEmpty(),
    check("tipo", 'El tipo es requerido').not().isEmpty(),
    validarCampos,
], updateDocente);

//delete
router.delete('/:iddelete', deleteDocente);

module.exports = router;