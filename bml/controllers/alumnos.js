const { response } = require("express");
const { querySingle, query, execute } = require('../../dal/data-access');

const getAlumnos = async(req, res) => {
    const alumnos = await query('stp_alumnos_getall');
    if (alumnos) {
        res.json({
            status: true,
            message: "Listado de alumnos",
            data: alumnos,
        });
    } else {
        res.json({
            status: false,
            message: res.message,
            data: null,
        });
    }
};

const getAlumno = async(req, res = response) => {
    const { id } = req.params;
    const sqlParams = [{
        name: "idAlumno",
        value: id,
    }, ];
    let alumno = await querySingle("stp_alumnos_getbyid", sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: `Alumno ${id}`,
            data: alumno,
        });
    } else {
        res.json({
            status: false,
            message: "Alumno no encontrado",
            data: null,
        });
    }
};

const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;

    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        },
    ];
    alumno = await execute('stp_alumnos_add', sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: 'Alumno agregado exitosamente',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el alumno',
            data: null
        });
    }


};

const updateAlumno = async(req, res = respones) => {
    const idAlumno = req.params.id;
    const { nombre, edad, sexo, semestre, carrera } = req.body;

    const sqlParams = [{
            'name': 'idAlumno',
            'value': idAlumno,
        },
        {
            'name': 'nombre',
            'value': nombre,
        },
        {
            'name': 'edad',
            'value': edad,
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre,
        },
        {
            'name': 'carrera',
            'value': carrera,
        },

    ];

    alumno = await execute('stp_alumnos_update', sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: 'El alumno se actualizo',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'No se pudo actualizar el alumno',
            data: null
        })
    }
};

const deleteAlumno = async(req, res = response) => {
    const { iddelete } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': iddelete
    }];

    alumno = await execute('stp_alumnos_delete', sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: `El alumno ${iddelete} se elimino `,
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'No se puto eliminar el alumno',
            data: null
        });
    }
};

module.exports = {
    getAlumnos,
    addAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumno
};