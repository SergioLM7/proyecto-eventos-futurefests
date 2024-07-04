/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace SQLUserWebQueries 
 */

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/users al método createUser
 * Este espera recibir por body todos los campos para crear el user
 * @memberof SQLUserWebQueries 
 * @method getUsersAdmin
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al obtener los usuarios.
 */
const getUsersAdmin = async (req, res) => {
    await fetch(`http://localhost:3000/api/users`)
        .then((res) => res.json())
        .then(users => {
            res.render("users.pug", { users, msj: `Usuarios volcados` }); //es una redirección a otra ruta
        })
};

module.exports = {
    getUsersAdmin
}