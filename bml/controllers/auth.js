const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { querySingle } = require('../../dal/data-access');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.json({
            status: false,
            message: 'Email no encontrado',
            data: null
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
        return res.json({
            status: false,
            message: 'Contraseña incorrecta',
            data: null
        });
    }

    const token = await generateJWT(usuario.idUsuario);

    res.json({
        status: true,
        message: 'Acceso correcto',
        token: token
    });
}

const googleSingIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        console.log(name);
        console.log(email);
        console.log(picture);
        usuario = await querySingle('stp_usuarios_login', sqlParams);
        console.log(usuario);

        //Verificar si existe en bd
        if (!usuario) {
            console.log(name);
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': picture
                }
            ];
            console.log(name);
            usuario = await querySingle('stp_usuarios_add', sqlParams);
        } else {
            //actualizar usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'password',
                    'value': usuario.password
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
                    'value': picture
                },
                {
                    'name': 'idUsuario',
                    'value': usuario.idUsuario
                }
            ];
            usuario = await querySingle('stp_usuarios_update', sqlParams);
        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            message: 'Acceso correcto',
            token: token
        });
    } catch (error) {
        res.status(401).json({
            status: false,
            error: 'El token de google no es correcto'
        });
    }
}

const renewToken = async(req, res = response) => {
    const { id } = req.id;
    const token = await generateJWT(id);
    res.json({
        status: true,
        message: 'Token nuevo',
        data: token
    });
}
module.exports = {
    login,
    googleSingIn,
    renewToken
}