/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace SQLUserWebQueries 
 */

const usersModel = require('../models/users.models')

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
    const { isAuthenticated, role } = req;

    try {
        const users = await usersModel.getAllUsers();
        res.render('header.pug', { isAuthenticated, role }, (err, header) => {
            if (err) {
                console.error('Error rendering header:', err);
                return res.status(500).send('Error rendering header');
            }
            res.render('users.pug', { header, users });
    });
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("home.pug", {msj:`Error al recuperar los eventos: ${error.stack}`});
    }
};

module.exports = {
    getUsersAdmin
}