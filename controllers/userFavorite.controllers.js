/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @memberof SQLQueries 
 */

const userFavoriteEntry = require('../models/userFavorite.models');

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/userfavorite al método createUserFavorite
 * Este espera recibir por body los dos campos para crear el userFavorite
 * @memberof SQLQueries 
 * @method createUserFavorite
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al crear el usuario-favorito
 */
const createUserFavorite = async (req, res) => {
    try {
        const response = await userFavoriteEntry.createUserFavorite(req.body);
        res.status(201).json({
            message: "Relación usuario-favorito creada"
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tabla usuario-favorito', error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/userfavorite al método deleteUserFavorite
 * Este espera recibir por body los dos campos para eliminar el userFavorite
 * @memberof SQLQueries 
 * @method deleteUserFavorite
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al eliminar el usuario-favorito
 */
const deleteUserFavorite = async (req, res) => {
    try {
        const user = await userFavoriteEntry.deleteUserFavorite(req.body);
        res.status(200).json({ message: `Se ha borrado la relación usuario-favorito.` });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/userfavorite o http://localhost:3000/api/userfavorite?user_id= al método getUserFavorites
 * Este espera recibir por body o por query el id del usuario del que queremos obtener sus favoritos
 * @memberof SQLQueries 
 * @method getUserFavorites
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al encontrar el usuario-favorito
 */
const getUserFavorites = async (req, res) => {
    let userFavorites;
    try {
        if (req.body.user_id) {
            //Meter el validador del GET
            userFavorites = await userFavoriteEntry.getUserFavorites(req.body.user_id);
        } else if (req.query.user_id) {
            //Meter el validador del GET
            userFavorites = await userFavoriteEntry.getUserFavorites(req.query.user_id);
        }
        res.status(200).json(userFavorites);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    createUserFavorite,
    deleteUserFavorite,
    getUserFavorites
};