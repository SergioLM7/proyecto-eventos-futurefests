/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @memberof SQLQueries 
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/userFavorite.queries');

/**
 * Descripción: Esta función crea un userFavorite en la tabla intermedia userFavorite
 * @memberof SQLQueries 
 * @method createUserFavorite 
 * @async 
 * @param {JSON} entry - Un JSON con el ID del user y el ID del favorite.
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createUserFavorite = async (entry) => {
    const { user_id, favorite_id } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUserFavorite, [user_id, favorite_id])
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
 * Descripción: Esta función elimina un userFavorite de la tabla userFavorite
 * @memberof SQLQueries 
 * @method deleteUserFavorite 
 * @async 
 * @param {JSON} entry - Un JSON con el valor email y con el favorite_ID de la fila a eliminar de la tabla
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteUserFavorite = async (entry) => {
    const { email, favorite_id } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserFavorite, [email, favorite_id])
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
 * Descripción: Esta función recoge todos los favorite_ID del usuario_ID que le pasemos como argumento
 * @memberof SQLQueries 
 * @method getUserFavorites 
 * @async 
 * @param {Integer} id - Un integer con el ID del usuario del cual queremos obtener sus favoritos
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const getUserFavorites = async (id) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getUserFavoritesByID, [id])
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
    createUserFavorite,
    deleteUserFavorite,
    getUserFavorites
}

//PRUEBAS
const userFavorite = {
    user_id: 1,
    favorite_id: 78
};

//getUserFavorites(1).then(data=>console.log(data))