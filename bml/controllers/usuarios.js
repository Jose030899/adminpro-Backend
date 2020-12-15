const { response } = require("express");
const bcrypt = require('bcryptjs');
const { querySingle, query, execute } = require('../../dal/data-access');
const { generateJWT } = require("../helpers/jwt");

const getUsuarios = async(req, res) => {
    const usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: "Listado de usuarios",
            data: usuarios,
        });
    } else {
        res.json({
            status: false,
            message: res.message,
            data: null,
        });
    }
};

const getUsuario = async(req, res = response) => {
    const { id } = req.params;
    const sqlParams = [{
        name: "idUsuario",
        value: id,
    }, ];
    let usuario = await querySingle("stp_usuarios_getbyid", sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: `Usuario ${id}`,
            data: usuario,
        });
    } else {
        res.json({
            status: false,
            message: 'Usuario no encontrado',
            data: null,
        });
    }
};

const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const sqlParamsVal = [{
        'name': 'email',
        'value': email
    }]

    let usuario = await querySingle('stp_usuarios_login', sqlParamsVal);
    if (!usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            },
            {
                'name': 'google',
                'value': 0
            },
            {
                'name': 'facebook',
                'value': 0
            },
            {
                'name': 'nativo',
                'value': 1
            },
            {
                'name': 'imagen',
                'value': null
            }
        ];
        usuario = await querySingle('stp_usuarios_add', sqlParams);
        if (usuario) {
            res.json({
                status: true,
                message: 'Usuario agregado exitosamente',
                data: usuario
            });
        } else {
            res.json({
                status: false,
                message: 'Ocurrio un error al agregar el usuario',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Ya existe un usuario con ese email',
            data: null
        })
    }
};

const updateUsuario = async(req, res = respones) => {
    const idUsuario = req.params.id;
    const { nombre, email, password, imagen } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    try {
        const sqlParams = [{
                'name': 'idUsuario',
                'value': idUsuario,
            },
            {
                'name': 'nombre',
                'value': nombre,
            },
            {
                'name': 'email',
                'value': email,
            },
            {
                'name': 'password',
                'value': newPassword
            },
            {
                'name': 'google',
                'value': 0,
            },
            {
                'name': 'facebook',
                'value': 0,
            },
            {
                'name': 'nativo',
                'value': 1,
            },
            {
                'name': 'imagen',
                'value': imagen
            },
        ];

        usuario = await execute('stp_usuarios_update', sqlParams);

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            message: 'El usuario se actualizo',
            data: { usuario, token }
        });
    } catch (error) {
        res.json({
            status: false,
            message: 'No se pudo actualizar el usuario',
            data: null
        })

    }

};

const deleteUsuario = async(req, res = response) => {
    const { iddelete } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': iddelete
    }];

    usuario = await execute('stp_usuarios_delete', sqlParams);
    if (usuario != 0) {
        res.json({
            status: true,
            message: `El usuario ${iddelete} se elimino `,
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'No se puto eliminar el usuario',
            data: null
        });
    }
};


module.exports = {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
};