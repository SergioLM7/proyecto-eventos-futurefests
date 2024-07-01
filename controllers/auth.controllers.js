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

const login = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
        }

        const usuarioAResvisar = usuarios.find(usuario => usuario.email === email);
        if (!usuarioAResvisar) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);
        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }

        const token = jsonwebtoken.sign(
            { email: usuarioAResvisar.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/profile"
        };

        res.cookie("jwt", token, cookieOption);
        res.send({ status: "ok", message: "Usuario loggeado", redirect: "/" });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ status: "Error", message: "Internal server error" });
    }
};

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
        const nuevoUsuario = { first_name, last_name, email, password: password_hash };

        console.log("Nuevo usuario creado:", nuevoUsuario);
        usuarios.push(nuevoUsuario);
        console.log("Lista de usuarios actualizada:", usuarios);

        res.send({ status: "ok", message: "Usuario registrado", redirect: "/login" });

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).send({ status: "Error", message: "Error en el servidor" });
    }
};

module.exports = {
    login,
    register
};
