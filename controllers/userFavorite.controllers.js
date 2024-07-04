/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace SQLUserFavQueries 
 */

const userFavoriteEntry = require('../models/userFavorite.models');

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/userfavorite al método createUserFavorite
 * Este espera recibir por body los dos campos para crear el userFavorite
 * @memberof SQLUserFavQueries 
 * @method createUserFavorite
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al crear relación usuario-favorito
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
 * @memberof SQLUserFavQueries 
 * @method deleteUserFavorite
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al eliminar la relación usuario-favorito
 */
const deleteUserFavorite = async (req, res) => {
    try {
        const user = await userFavoriteEntry.deleteUserFavorite(req.body);
        if (user != 1) {
            res.status(400).json({ error: "Este usuario no tiene guardado este favorito" });
        } else {
            res.status(200).json({ message: `Se ha borrado la relación usuario-favorito.` });
        } 
    } catch (error) {
        res.status(500).json({ error: "Error en la BBD" });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/userfavorite o http://localhost:3000/api/userfavorite?user_id= al método getUserFavorites
 * Este espera recibir por body o por query el id del usuario del que queremos obtener sus favoritos
 * @memberof SQLUserFavQueries 
 * @method getUserFavorites
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al obtener las relaciones usuario-favorito.
 */
const getUserFavorites = async (req, res) => {
    let userFavorites;
    try {
        if (req.body.email) {
            //Meter el validador del GET
            userFavorites = await userFavoriteEntry.getUserFavoriteByEmail(req.body.email);
        } else if (req.query.email) {
            //Meter el validador del GET
            userFavorites = await userFavoriteEntry.getUserFavoriteByEmail(req.query.email);
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