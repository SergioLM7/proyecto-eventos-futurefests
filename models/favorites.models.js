/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @namespace FavoritesFunctions
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/favorites.queries');


/**
 * Descripción: Esta función crea un favorito en la tabla Favorites
 * @memberof FavoritesFunctions 
 * @method createFavorite 
 * @async 
 * @param {JSON} entry - JSON con todos los valores de cada favorito
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createFavorite = async (entry) => {
    let { favorite_name, favorite_image, date_start, date_end, favorite_url, favorite_type } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createFavorite, [favorite_name,favorite_image, date_start,date_end, favorite_url, favorite_type])
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función elimina un favorito de la tabla Favorites por su nombre
 * @memberof FavoritesFunctions 
 * @method deleteFavorite 
 * @async 
 * @param {JSON} name - JSON con el nombre del favorito a elimiar
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteFavorite = async (name) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteFavorite, [name])
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función selecciona un favorito de la tabla Favorites por su nombre
 * @memberof FavoritesFunctions 
 * @method getFavoriteByName 
 * @async 
 * @param {JSON} name - JSON con el nombre del favorito a mostrar
 * @return {Integer} Devuelve el ID del favorito obtenido.
 * @throws {Error} Error de consulta a la BBDD
 */
const getFavoriteByName = async(name) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getFavoriteByName, [name])
        result = data.rows[0].favorite_id;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función selecciona un favorito de la tabla Favorites por el ID del ususario con el que se relaciona
 * @memberof FavoritesFunctions 
 * @method getFavoriteByUserId 
 * @async 
 * @param {JSON} id - JSON con el ID del usuario.
 * @return {Array} Devuelve una array con todos los favoritos (objetos) guardados por dicho usuario.
 * @throws {Error} Error de consulta a la BBDD
 */
const getFavoriteByUserId = async(id) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getFavoriteByUserId, [id])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

module.exports = {
    createFavorite,
    deleteFavorite,
    getFavoriteByName,
    getFavoriteByUserId
};

//PRUEBAS
/*CREATE */
/*const objFavorites = {
    favorite_name: "WWDC",
    favorite_image: "https://wwwdc/imagen.png",
    date_start: "2025-03-20", 
    date_end: "2025-03-30", 
    favorite_url: "https://apple.com", 
    favorite_type: "Feria"
}*/

//getFavoriteByName("World Tech Congress").then(data=>console.log(data));