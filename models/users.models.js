/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports entries
 * @memberof SQLQueries 
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/users.queries');

/**
 * Descripción: Esta función crea un usuario en la tabla users
 * @memberof SQLQueries 
 * @method createUser 
 * @async 
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createUser = async (entry) => {
    let { email, password_hash, first_name, last_name } = entry;
    let client, result;
    let role_id = 2;
    let is_active = true;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser, [email, password_hash, first_name, last_name, role_id, is_active])
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
 * Descripción: Esta función edita el rol de un usuario en la tabla users
 * @memberof SQLQueries 
 * @method editUser 
 * @async 
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const editUser = async (entry) => {
    const { newValue, email } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        if (Number.isInteger(newValue)) {
            const data = await client.query(queries.editRoleByAdmin, [newValue, email])
            result = data.rowCount;
        } else if (typeof newValue === 'boolean') {
            const data = await client.query(queries.editActiveByAdmin, [newValue, email])
            result = data.rowCount;
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función edita la password de un usuario en la tabla users
 * @memberof SQLQueries 
 * @method editPasswordByUser 
 * @async 
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const editPasswordByUser = async(entry) => {
    const { newPass, email } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.editPasswordByUser, [newPass, email])
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
 * Descripción: Esta función elimina un usuario de la tabla users
 * @memberof SQLQueries 
 * @method deleteUserByAdmin 
 * @async 
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteUserByAdmin = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUserByAdmin, [email])
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
 * Descripción: Esta función muestra a todos los usuarios de la tabla users
 * @memberof SQLQueries 
 * @method getAllUsers 
 * @async 
 * @return {Array} Devuelve array con todos los usuarios de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const getAllUsers = async() => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllUsers)
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result

};

/**
 * Descripción: Esta función muestra un usuario de la tabla users en base a su email
 * @memberof SQLQueries 
 * @method getUsersByEmail 
 * @async 
 * @return {Array} Devuelve array con el usuario seleccionado de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const getUsersByEmail = async(email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUsersByEmail, [email])
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
    createUser,
    editUser,
    editPasswordByUser,
    deleteUserByAdmin,
    getAllUsers,
    getUsersByEmail
}

//PRUEBAS
const objUser = {
    email: 'juan@hotmail.com',
    password_hash: 'sasbñgmfd',
    first_name: 'Juan',
    last_name: 'García'
};

createUser(objUser).then(data=>console.log(data));

/*PRUEBA 2 const objUser = {
    newRole: true,
    email: 'juan@hotmail.com'
}

editRoleByAdmin(objUser).then(data=>console.log(data));*/

/*PRUEBA 3 const objPassUser = {
    newPass: 'asdafasffa8087',
    email: 'juan@hotmail.com'
}
editPasswordByUser(objPassUser).then(data=>console.log(data));*/

//PRUEBA 4 deleteUserByAdmin('juan@hotmail.com').then(data=>console.log(data));

//PRUEBA 5
//getUsersByEmail('user1@user.com').then(data=>console.log(data))