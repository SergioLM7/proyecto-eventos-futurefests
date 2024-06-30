const pool = require('../config/db_pgsql');
const queries = require('../queries/userFavorite.queries');


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


const deleteUserFavorite = async (entry) => {
    const { user_id, favorite_id } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserFavorite, [user_id, favorite_id])
        result = data.rowCount;
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
    deleteUserFavorite
}

//PRUEBAS
const userFavorite = {
    user_id: 6,
    favorite_id: 2
}

//createUserFavorite(userFavorite).then(data=>console.log(data))