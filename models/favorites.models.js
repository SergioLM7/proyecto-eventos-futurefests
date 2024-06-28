/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @memberof SQLQueries 
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/favorites.queries');


/**
 * Descripción: Esta función crea un rol en la tabla Roles
 * @memberof SQLQueries 
 * @method createRole 
 * @async 
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createFavorite = async (entry) => {
    let { favorite_name, favorite_image, date_start, date_end, favorite_url, favorite_type } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
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
 * Descripción: Esta función edita el campo role_name de la tabla Roles
 * @memberof SQLQueries 
 * @method editRole 
 * @async 
 * @return {Integer} Devuelve el número de rows editadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteFavorite = async (name) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
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

const getFavoriteByName = async(name) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
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

const getFavoriteByUserId = async(id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
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

//getFavoriteByUserId(6).then(data=>console.log(data));


module.exports = {
    createFavorite,
    deleteFavorite,
    getFavoriteByName,
    getFavoriteByUserId
}