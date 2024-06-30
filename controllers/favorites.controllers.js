/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @memberof SQLQueries 
 */

const favoriteEntry = require('../models/favorites.models');

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/favorites al método createFavorite
 * @memberof SQLQueries 
 * @method createFavorite 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al crear el favorito
 */
const createFavorite = async (req, res) => {
    try {
        const response = await favoriteEntry.createFavorite(req.body);
        res.status(201).json({
            message: `Favorito creado: ${req.body.favorite_name}`
        });
    } catch (error) {
        res.status(500).json({ message: "Error en la BBD", error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/favorites al método deleteFavorite
 * Y espera recibir un JSON por body con favorite_name
 * @memberof SQLQueries 
 * @method deleteFavorite 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al eliminar el favorito
 */
const deleteFavorite = async (req, res) => {
    let favorite;
    try {
        favorite = await favoriteEntry.deleteFavorite(req.body.favorite_name);
        res.status(200).json({ message: `Se ha borrado el favorito ${req.body.favorite_name}.` });
    } catch (error) {
        res.status(500).json({ message: "Error en la BBD", error});
    }
};

// GET http://localhost:3000/api/favorites?user_id= --> by ID in query
// GET http://localhost:3000/api/favorites --> by ID or name in Body
/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/favorites a getFavoriteByUserID, en el caso de recibir por body un JSON con user_id o un valor de user_id por query
 * En el caso de recibir por body un JSON con favorite_name, llamará a la función getFavoriteByName. En todos los casos arrojará un status 200
 * @memberof SQLQueries 
 * @method getFavorite 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al obtener el favorito
 */
const getFavorite = async (req,res) => {
    let favorites;
    try {
        if (req.body.user_id) {
            //Meter el validador del GET
            favorites = await favoriteEntry.getFavoriteByUserId(req.body.user_id);
        } else if (req.query.user_id) {
            //Meter el validador del GET
            favorites = await favoriteEntry.getFavoriteByUserId(req.query.user_id);
        } else if (req.body.favorite_name) {
            //Meter el validador del GET
            favorites = await favoriteEntry.getFavoriteByName(req.body.favorite_name);
        }
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};


module.exports = {
    createFavorite,
    deleteFavorite,
    getFavorite
}