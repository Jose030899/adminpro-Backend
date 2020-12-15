//Ruta api/materias
const { Router } = require("express");
const { check } = require("express-validator");
const { getMaterias, getMateria, addMateria, updateMateria, deleteMateria } = require("../bml/controllers/materias");
const { validarCampos } = require("../bml/middlewares/validar-campos");

const router = Router();

//getall
router.get("/", getMaterias);


//getbyid
router.get('/:id', getMateria);

//Add
//agregar
router.post("/", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("horas", 'Las horas son requeridas').not().isEmpty(),
    check("horasp", 'Las horasp son requeridas').not().isEmpty(),
    check("horast", 'Las horast son requeridas').not().isEmpty(),
    check("creditos", 'Los creditos son requeridas').not().isEmpty(),
    validarCampos,
], addMateria);


//update
router.put("/:id", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("horas", 'Las horas son requeridas').not().isEmpty(),
    check("horasp", 'Las horasp son requeridas').not().isEmpty(),
    check("horast", 'Las horast son requeridas').not().isEmpty(),
    check("creditos", 'Los creditos son requeridas').not().isEmpty(),
    validarCampos,
], updateMateria);

//delete
router.delete('/:iddelete', deleteMateria);

module.exports = router;