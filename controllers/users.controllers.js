/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @memberof SQLQueries 
 */

const usersEntry = require('../models/users.models');

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/users al método createUser
 * Este espera recibir por body todos los campos para crear el user
 * @memberof SQLQueries 
 * @method createUser
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al crear el usuario
 */
const createUser = async (req, res) => {
    try {
        const response = await usersEntry.createUser(req.body);
        res.status(201).json({
            message: `usuario creado: ${req.body.email}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/users:email? al método getUsers
 * Este espera recibir por query o por body el email del usuario a buscar. Si no, mostrará todos los usuarios
 * @memberof SQLQueries 
 * @method getUsers
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al buscar los/el usuario/s
 */
const getUsers = async (req, res) => {
    let users;
    try {
        if (req.body.email) {
            //Meter el validador del GET
            users = await usersEntry.getUsersByEmail(req.body.email);
        } else if (req.query.email) {
            //Meter el validador del GET
            users = await usersEntry.getUsersByEmail(req.query.email);
        } else {
            //Meter el validador del GET
            users = await usersEntry.getAllUsers();
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/users/:email?  al método deleteUserByAdmin
 * Este espera recibir por query o por body el email del usuario a eliminar. 
 * @memberof SQLQueries 
 * @method deleteUser
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al eliminar el usuario
 */
const deleteUser = async (req, res) => {
    let user;
    try {
        if (req.body.email) {
            user = await usersEntry.deleteUserByAdmin(req.body.email);
            res.status(200).json({ message: `Se ha borrado el usuario ${req.body.email}.` });
        } else if (req.query.email) {
            user = await usersEntry.deleteUserByAdmin(req.query.email);
            res.status(200).json({ message: `Se ha borrado el usuario ${req.query.email}.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBD" });
    }
};


/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/users al método editUser
 * Este espera recibir por body uno de los dos campos editables (role_id / is_active) y el email del usuario a editar.
 * @memberof SQLQueries 
 * @method updateUsers
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al editar el usuario
 */
const updateUsers = async (req, res) => {
    console.log(req.body)
   try {
            console.log(req.body)
            const response = await usersEntry.editUser(req.body);
            console.log(response)
            res.status(201).json({
                items_updated: response.rowCount,
                message: `Se ha modificado el usuario ${response.email}`
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/users/pass al método editPasswordByUser
 * Este espera recibir por body un nuevo valor de password_hash y el email del usuario a editar.
 * @memberof SQLQueries 
 * @method updatePassword
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al editar la contraseña del usuario
 */
const updatePassword = async (req, res) => {
    if (req.body.password_hash) {
        console.log(req.body)
        try {
            const response = await usersEntry.editPasswordByUser(req.body);
            console.log(response)
            res.status(201).json({
                items_updated: response.rowCount,
                message: `Se ha modificado la contraseña del usuario ${response.email}`
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUsers,
    updatePassword
};