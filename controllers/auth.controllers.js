/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace LoginRegisterFunction
 */

const userModel = require('../models/users.models')

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const usuarios = [
    {
        email: "prueba_1@prueba.com",
        password: "prueba",
        first_name: "Prueba",
        last_name: "Prueba P"
    }
];

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
        const response = await fetch(`http://localhost:3000/api/users?email=${req.body.email}`)
        const dataUser = await response.json();
        console.log(dataUser);

        //const usuarioAResvisar = usuarios.find(usuario => usuario.email === email);
        //console.log(usuarioAResvisar);
        if (dataUser == []) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        const loginCorrecto = await bcryptjs.compare(password_hash, dataUser[0].password_hash);
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        const token = jsonwebtoken.sign(
            { 
                email: dataUser[0].email,
                role_id: dataUser[0].role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        console.log(token);

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        };

        res.cookie("jwt", token, cookieOption);
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
    const { password, email, first_name, last_name } = req.body;

    
    if (!password || !email || !first_name || !last_name) {
        console.log("Campos incompletos");
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    const usuarioARevisar = usuarios.find(usuario => usuario.email === email);
    if (usuarioARevisar) {
        console.log("Usuario o email ya existe");
        return res.status(400).send({ status: "Error", message: "Este usuario o email ya existe" });
    }

    try {
        const salt = await bcryptjs.genSalt();
        const password_hash = await bcryptjs.hash(password, salt);
        const nuevoUsuario = { first_name, last_name, email, password_hash: password_hash };

        const usuarioRegistrado = userModel.createUser(nuevoUsuario);
       
        if (usuarioRegistrado) {
            res.send({ status: "ok", message: "Usuario registrado", redirect: "/login" });
        } else {
            console.log('Error al guardar el usuario en BBDD')
        }

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).send({ status: "Error", message: "Error en el servidor" });
    }
};

/* const googleAuth = (req, res) => {
    res.send('<a href="/auth/google">Authenticate with google </a>');
};
 */

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
const googleCallback = (req, res) => {
    const payload = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        check: true
    };
    console.log(payload)
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: "20m" });

    console.log(token);
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
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
    /* googleAuth, */
    googleCallback,
    /* dashboard, */
    authFailure,
    logout,
    login,
    register,
}