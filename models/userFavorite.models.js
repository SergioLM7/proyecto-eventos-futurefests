/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @namespace UserFavoritesFunctions
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/userFavorite.queries');

/**
 * Descripción: Esta función crea un userFavorite en la tabla intermedia userFavorite
 * @memberof UserFavoritesFunctions 
 * @method createUserFavorite 
 * @async 
 * @param {JSON} entry - Un JSON con el ID del user y el ID del favorite.
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createUserFavorite = async (entry) => {
    const { email, favorite_id } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUserFavorite, [email, favorite_id])
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
 * @memberof UserFavoritesFunctions 
 * @method deleteUserFavorite 
 * @async 
 * @param {JSON} entry - Un JSON con los dos valores (ID) de la fila a eliminar de la tabla
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
    console.log(result)
    return result
};

const getUserFavoriteByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getUserFavoritesByEmail, [email])
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
    getUserFavoriteByEmail
}

//PRUEBAS
const userFavorite = {
    user_id: 6,
    favorite_id: "asdafafa56"
};

//createUserFavorite(userFavorite).then(data=>console.log(data))
//getUserFavoriteByEmail('sergio@admin.com').then(data=>console.log(data))