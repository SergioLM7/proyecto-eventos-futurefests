/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace LoginRegisterWebFunction
 */

/**
 * Descripción: Esta función renderiza la pagina de login.
 * @memberof LoginRegisterWebFunction 
 * @function showLogIn 
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al renderizar la página de login.
 */
const showLogIn = async (req, res) => {
    try {
        res.status(200).render("login.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("login.pug", {msj:`Error al cargar el log in: ${error.stack}`});
    }
};

/**
 * Descripción: Esta función renderiza la pagina de login.
 * @memberof LoginRegisterWebFunction 
 * @function showRegister 
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al renderizar la página de registro.
 */
const showRegister = async (req, res) => {
    try {
        res.status(200).render("register.pug", {msj:"Register OK"});
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("register.pug", {msj:`Error al cargar el registro: ${error.stack}`});
    }
};

module.exports = {
    showLogIn,
    showRegister
}