//Ruta api/alumnos
const { Router } = require("express");
const { check } = require("express-validator");
const { addAlumno, getAlumnos, updateAlumno, deleteAlumno, getAlumno } = require("../bml/controllers/alumnos");
const { validarCampos } = require("../bml/middlewares/validar-campos");

const router = Router();

//getall
router.get("/", getAlumnos);

//getbyid
router.get('/:id', getAlumno);


//Add
//agregar
router.post("/", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("edad", 'La edad es requerida').not().isEmpty(),
    check("sexo", 'Indique el sexo').not().isEmpty(),
    check("semestre", 'El semestre es requerido').not().isEmpty(),
    check("carrera", 'Indique la carrera').not().isEmpty(),
    validarCampos,
], addAlumno);

//update
router.put("/:id", [
    check("nombre", 'El nombre es requerido').not().isEmpty(),
    check("edad", 'La edad es requerida').not().isEmpty(),
    check("sexo", 'Indique el sexo').not().isEmpty(),
    check("semestre", 'El semestre es requerido').not().isEmpty(),
    check("carrera", 'Indique la carrera').not().isEmpty(),
    validarCampos,
], updateAlumno);

//delete
router.delete('/:iddelete', deleteAlumno);

module.exports = router;