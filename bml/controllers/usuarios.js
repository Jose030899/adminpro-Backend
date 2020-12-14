const { response } = require("express");
const bcrypt = require('bcryptjs');
const { querySingle, query, execute } = require('../../dal/data-access');
const { generateJWT } = require("../helpers/jwt");

const getUsuarios = async(req, res) => {
    const usuarios = await query('stp_usuarios_getall');
    res.json({
        status: true,
        message: "Listado de usuarios",
        data: usuarios,
    });
};

const getUsuario = async(req, res = response) => {
    const idUsuario = req.params.id;
    const sqlParams = [{
        name: "idUsuario",
        value: idUsuario,
    }, ];
    const usuario = await querySingle("stp_usuarios_getbiid");
    res.json({
        status: true,
        message: `Usuario ${idUsuario}`,
        data: usuario,
    });
};

const addUsuario = async(req, res = response) => {
    const { nombre, email, password } = req.body;
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
            message: 'Registro exitoso',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'Usuario ya creado',
            data: null
        })
    }
    /*  sql.on("error", err => {
         console.log(err);
         res.json({
             status: false,
             error: "no se",
         });
     });

     //Encryptar password
     const salt = bcrypt.genSaltSync();
     const newPassword = bcrypt.hashSync(password, salt);

     //Agregar el usuario
     sql.connect(conString).then((pool) => {
         return pool.request()
             .input("nombre", nombre)
             .input("email", email)
             .input("password", newPassword)
             .execute("stp_usuarios_add");
     }).then((result) => {
         res.status(201).json({
             status: true,
             usuario: result.recordset[0],
         });
     }).catch((err) => {
         res.json({
             status: false,
             err
         })
     }); */
};

const updateUsuario = async(req, res = respones) => {
    const idUsuario = req.params.id;
    const { nombre, email, password, imagen } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    try {
        const sqlParams = [{
                name: 'idUsuario',
                values: idUsuario,
            },
            {
                name: 'nombre',
                values: nombre,
            },
            {
                name: 'email',
                values: email,
            },
            {
                name: 'nombre',
                values: nombre,
            },
            {
                'name': 'password',
                'value': newPassword
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
            message: 'No se puto actualizar el usuario',
            data: error
        })

    }

};

const deleteUsuario = async(req, res = response) => {
    const idUsuario = req.params.id;

    sql.on("error", (err) => {
        console.log(err);
        res.json({
            status: false,
            error: err,
        });
    });
    sql.connect(conString).then((pool) => {
        return pool.request()
            .input('idUsuario', idUsuario)
            .execute("stp_usuarios_delate");
    }).then((result) => {
        //const res = result.recordset[0];
        res.status(201).json({
            status: true,
            msg: "Usuario eliminado correctamente",
        });
    }).catch((err) => {
        res.json({
            status: false,
            error: err,
        });
    });
}

module.exports = {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
};