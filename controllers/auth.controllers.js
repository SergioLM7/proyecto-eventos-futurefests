/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace LoginRegisterFunction
 */

const userModel = require('../models/users.models');

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/login a la funcion Login
 * Este espera recibir por body un JSON con todos los campos del usuario.
 * @memberof LoginRegisterFunction 
 * @method login 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error durante login
 */
const login = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { email, password_hash } = req.body;

        if (!email || !password_hash) {
            return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
        }

        //llamar al modelo NO fetch
        const response = await userModel.getUsersByEmail(email);
        console.log(response)

        if (response === 0) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        const loginCorrecto = await bcryptjs.compare(password_hash, response.password_hash);
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        const token = jsonwebtoken.sign(
            {
                email: response.email,
                role_id: response.role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        console.log(token);

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/",
        };

        res.cookie("access-token", token, cookieOption);
        res.redirect('/')
        //res.send({ status: "ok", message: "Usuario loggeado", redirect: "/" });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ status: "Error", message: "Internal server error" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/register a la funcion register
 * Este espera recibir por body un JSON con todos los campos del usuario.
 * @memberof LoginRegisterFunction 
 * @method register 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al crear el usuario
 */
const register = async (req, res) => {
    console.log(req.body);
    const { password_hash, email, first_name, last_name } = req.body;

    if (!password_hash || !email || !first_name || !last_name) {
        console.log("Campos incompletos");
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    try {
        const usuarioARevisar = await userModel.getUsersByEmail(email);

        if (usuarioARevisar === 0) {
            console.log("Usuario o email ya existe");
            return res.status(400).send({ status: "Error", message: "Este usuario o email ya existe" });
        }

        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password_hash, salt);
        const nuevoUsuario = { first_name, last_name, email, password_hash: hashedPassword };

        const usuarioRegistrado = await userModel.createUser(nuevoUsuario);

        if (usuarioRegistrado) {
            res.redirect("/login" );
        } else {
            console.log('Error al guardar el usuario en BBDD');
            return res.status(500).send({ status: "Error", message: "Error al guardar el usuario en la base de datos" });
        }
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).send({ status: "Error", message: "Error en el servidor" });
    }

};


/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/register a la funcion register
 * Este espera recibir por body un JSON con todos los campos del usuario.
 * @memberof LoginRegisterFunction 
 * @method googleCallback 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al inicio sesion
 */
const googleCallback = async (req, res) => {
    const payload = {
        email: req.user.emails[0].value,
        role_id: 2
    };
    console.log(req.user.emails[0].value)
    console.log(payload)
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    console.log(token);
    res.cookie("access-token", token, {
        /* httpOnly: true,
        sameSite: "strict", */
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/",
    }).redirect("/");
};

/* const dashboard = (req, res) => {
    res.send("Welcome to your dashboard! You are now authenticated with google! <br><br> <a href='/logout'>Click here to logout!</a>");
}; */


/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/register a la funcion register
 * Este espera recibir por body un JSON con todos los campos del usuario.
 * @memberof LoginRegisterFunction 
 * @method authFailure 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 */
const authFailure = (req, res) => {
    res.redirect("/login");
};


/**
 * Cierra la sesión del usuario, destruye la sesión y limpia la cookie de 'access-token'.
 * Luego envía una respuesta al usuario indicando que se ha desconectado exitosamente y proporciona un enlace para autenticarse nuevamente con Google.
 * @memberof LoginRegisterFunction 
 * @function logout
 * @async
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar el control al siguiente middleware
 */
const logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token").send('Goodbye! <br><br> <a href="/auth/google">Authenticate again</a>');
    });
};


module.exports = {
    googleCallback,
    authFailure,
    logout,
    login,
    register
};


/*PRUEBA
const usuarios = [
    {
        email: "prueba_1@prueba.com",
        password: "prueba",
        first_name: "Prueba",
        last_name: "Prueba P"
    }
];*/