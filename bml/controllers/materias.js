const { response } = require("express");
const { querySingle, query, execute } = require('../../dal/data-access');

const getMaterias = async(req, res) => {
    const materias = await query('stp_materias_getall');
    if (materias != 0) {
        res.json({
            status: true,
            message: "Listado de materias",
            data: materias,
        });
    } else {
        res.json({
            status: false,
            message: "No se pudo acceder a la lista de materias",
            data: null,
        });
    }
};

const getMateria = async(req, res = response) => {
    const { id } = req.params;
    const sqlParams = [{
        name: "idMateria",
        value: id,
    }, ];
    let materias = await querySingle("stp_materias_getbyid", sqlParams);
    if (materias) {
        res.json({
            status: true,
            message: `Materia ${id}`,
            data: materias,
        });
    } else {
        res.json({
            status: false,
            message: "Materia no encontrada",
            data: null,
        });
    }
};

const addMateria = async(req, res) => {
    const { nombre, horas, horasp, horast, creditos } = req.body;

    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasp
        },
        {
            'name': 'horast',
            'value': horast
        },
        {
            'name': 'creditos',
            'value': creditos
        },
    ];
    materias = await execute('stp_materias_add', sqlParams);
    if (materias) {
        res.json({
            status: true,
            message: 'Materia agregado exitosamente',
            data: materias
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el alumno',
            data: null
        });
    }


};

const updateMateria = async(req, res = respones) => {
    const idMateria = req.params.id;
    const { nombre, horas, horasp, horast, creditos } = req.body;

    const sqlParams = [{
            'name': 'idMateria',
            'value': idMateria,
        },
        {
            'name': 'nombre',
            'value': nombre,
        },
        {
            'name': 'horas',
            'value': horas,
        },
        {
            'name': 'horasp',
            'value': horasp
        },
        {
            'name': 'horast',
            'value': horast,
        },
        {
            'name': 'creditos',
            'value': creditos,
        },

    ];

    materia = await execute('stp_materias_update', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: 'La materia se actualizo',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'No se pudo actualizar la materia',
            data: null
        })
    }
};

const deleteMateria = async(req, res = response) => {
    const { iddelete } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': iddelete
    }];

    materia = await execute('stp_materias_delete', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: `El alumno ${iddelete} se elimino `,
            data: materia
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
    getMaterias,
    addMateria,
    updateMateria,
    deleteMateria,
    getMateria
};