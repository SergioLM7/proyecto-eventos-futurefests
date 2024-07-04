/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports middleware
 * @namespace AuthMiddlewareFunctions 
 */

require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
//
const { usuarios } = require('../controllers/auth.controllers.js')

/**
 * Descripción: Middleware que permite el acceso solo a usuarios autenticados.
 * Redirige a la página principal si no hay sesión iniciada.
 * @memberof AuthMiddlewareFunctions 
 * @method onlyLogin
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @param {Function} next - Función de middleware para pasar al siguiente middleware.
 */
const onlyLogin = (req, res, next) => {
    const logueado = revisarCookie(req)
    console.log("estas en zona reservvada para logueados")
    if(logueado) return next;
    return res.redirect("/");
}

/**
 * Descripción: Middleware que permite el acceso solo a usuarios no autenticados.
 * Redirige al inicio de sesión si hay una sesión activa.
 * @memberof AuthMiddlewareFunctions 
 * @method onlyPublic
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @param {Function} next - Función de middleware para pasar al siguiente middleware.
 */
const onlyPublic = (req, res, next) => {
    const logueado = revisarCookie(req)
    if(!logueado) return next;
    return res.redirect("/");
}

/**
 * Descripción: Middleware que permite el acceso solo a usuarios administradores.
 * Redirige a la página principal si el usuario no es administrador.
 * @memberof AuthMiddlewareFunctions 
 * @method onlyAdmin
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @param {Function} next - Función de middleware para pasar al siguiente middleware.
 */
const onlyAdmin = (req, res, next) => {

}

/**
 * Descripción: Función para verificar el token JWT almacenado en las cookies de la solicitud.
 * @memberof AuthMiddlewareFunctions 
 * @method revisarCookie
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express que contiene las cookies.
 * @param {Object} res Objeto de usuario decodificado del token JWT si la verificación es exitosa, o false si no hay token válido.
 */
const revisarCookie = () => {
try{
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
    const usuarioAResvisar = usuarios.find(usuario => usuario.email === decodificada.email);
    if (!usuarioAResvisar) {
        return false;
    } else { true }
}
catch{
    return false;
}
}

module.exports = {
    onlyLogin,
    onlyAdmin,
    onlyPublic
};
