const { response } = require("express");
const { querySingle, query, execute } = require('../../dal/data-access');

const getDocentes = async(req, res) => {
    const docentes = await query('stp_docentes_getall');
    if (docentes != 0) {
        res.json({
            status: true,
            message: "Listado de docentes",
            data: docentes,
        });
    } else {
        res.json({
            status: false,
            message: "No tiene ningun docente",
            data: null,
        });
    }
};

const getDocente = async(req, res = response) => {
    const { id } = req.params;
    const sqlParams = [{
        name: "idDocente",
        value: id,
    }, ];
    let materia = await querySingle("stp_docentes_getbyid", sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: `Docente ${id}`,
            data: materia,
        });
    } else {
        res.json({
            status: false,
            message: "Docente no encontrado",
            data: null,
        });
    }
};

const addDocentes = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;

    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        },
    ];
    docente = await execute('stp_docentes_add', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Docente agregado exitosamente',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el docente',
            data: null
        });
    }
};

const updateDocente = async(req, res = respones) => {
    const idDocente = req.params.id;
    const { nombre, edad, titulo, tipo } = req.body;

    const sqlParams = [{
            'name': 'idDocente',
            'value': idDocente,
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
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo,
        },
    ];

    docentes = await execute('stp_docentes_update', sqlParams);
    if (docentes) {
        res.json({
            status: true,
            message: 'El docentes se actualizo',
            data: docentes
        });
    } else {
        res.json({
            status: false,
            message: 'No se pudo actualizar el docentes',
            data: null
        })
    }
};

const deleteDocente = async(req, res = response) => {
    const { iddelete } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': iddelete
    }];

    docente = await execute('stp_docentes_delete', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: `El docente ${iddelete} se elimino `,
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'No se puto eliminar el docente',
            data: null
        });
    }
};

module.exports = {
    getDocentes,
    addDocentes,
    updateDocente,
    deleteDocente,
    getDocente
};