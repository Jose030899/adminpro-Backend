const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;

    try {
        sql.on("error", (err) => {
            console.log(err);
            res.json({
                ok: false,
                error: err,
            });
        });

        //agregar el usuario
        await sql.connect(conString).then((pool) => {
            return pool.request()
                .input("email", email)
                .execute("stp_usuarios_login");
        }).then((result) => {
            usuario = result.recordset[0];
        }).catch((err) => {
            usuario = null;
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            ok: true,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Que paso ahi, estamos agarrando señal"
        });
    }
}

const googleSingIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        sql.on("error", (err) => {
            console.log(err);
            res.json({
                ok: false,
                error: err,
            });
        });

        //login
        await sql.connect(conString).then((pool) => {
            return pool.request()
                .input("email", email)
                .execute("stp_usuarios_login");
        }).then((result) => {
            usuario = result.recordset[0];
        }).catch((err) => {
            usuario = null;
        });

        //Verificar si existe en bd
        if (!usuario) {
            //crear usuario
            await sql.connect(conString).then((pool) => {
                return pool.request()
                    .input("nombre", name)
                    .input("email", email)
                    .input("google", 1)
                    .input("imagen", picture)
                    .execute("stp_usuarios_add");
            }).then((result) => {
                console.log("Usuario de google creado");
            }).catch((err) => {
                console.log("No se pudo crear");
            });
        } else {
            //actualizar usuario
            await sql.connect(conString).then((pool) => {
                return pool.request()
                    .input("idUsuario", usuario.idUsuario)
                    .input("nombre", name)
                    .input("email", email)
                    .input("google", 1)
                    .input("imagen", picture)
                    .execute("stp_usuarios_update");
            }).then((result) => {
                console.log("Usuario de google actualizado");
            }).catch((err) => {
                console.log("No se pudo actualizar");
            });
        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            ok: true,
            token: token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            error: "Token no es correcto"
        });
    }
}

module.exports = {
    login,
    googleSingIn
}