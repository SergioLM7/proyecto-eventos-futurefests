/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @memberof SQLQueries 
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/users.queries');

/**
 * Descripción: Esta función crea un usuario en la tabla users
 * @memberof SQLQueries 
 * @method createUser 
 * @async
 * @param {JSON} entry - JSON con todos los campos para crear una fila de usuario
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createUser = async (entry) => {
    let { email, password_hash, first_name, last_name } = entry;
    let client, result;
    let role_id = 2;
    let is_active = true;
    let is_logged = false;
    let dateNow = Date.now();
    let last_time_logged = new Date(dateNow).toUTCString();
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUser, [email, password_hash, first_name, last_name, role_id, is_active, is_logged, last_time_logged])
        console.log(data);
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
 * Descripción: Esta función edita el rol o el is_active de un usuario en la tabla users
 * @memberof SQLQueries 
 * @method editUser 
 * @async 
 * @param {JSON} entry - Un JSON con el nuevo valor de role_id o is_active a modificar, más el email del usuario a editar
 * @return {Object} Devuelve un objeto con el número de filas modificadas y el email del usuario
 * @throws {Error} Error de consulta a la BBDD
 */
const editUser = async (entry) => {
    let client, result;
    try {
        client = await pool.connect();
        if (entry.role_id) {
            const { role_id, email } = entry
            if (Number.isInteger(role_id)) {
                const data = await client.query(queries.editRoleByAdmin, [role_id, email]);
                result = { rowCount: data.rowCount, email };
                return result
            } else {
                console.log('El valor introducido no es válido.')
            }
        } else if (typeof is_active == "boolean") {
            const { is_active, email } = entry
                const data = await client.query(queries.editActiveByAdmin, [is_active, email]);
                result = { rowCount: data.rowCount, email };
                return result
        } else if (typeof entry.is_logged == "boolean") {
            const { is_logged, email } = entry
            const data = await client.query(queries.editLogged, [is_logged, email]);
            result = { rowCount: data.rowCount, email };
            return result
        } else {
            console.log('Los campos no son los correctos.')
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
 * @param {JSON} entry -Un JSON con el nuevo valor de password_hash a modificar, más el email del usuario a editar
 * @return {Object} Devuelve un objeto con el número de filas modificadas y el email del usuario
 * @throws {Error} Error de consulta a la BBDD
 */
const editPasswordByUser = async (entry) => {
    const { password_hash, email } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.editPasswordByUser, [password_hash, email])
        result = { rowCount: data.rowCount, email };
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};

/**
 * Descripción: Esta función elimina el usuario de la tabla users
 * @memberof SQLQueries 
 * @method deleteUserByAdmin 
 * @async
 * @param {JSON} email - JSON con el email del usuario a eliminar
 * @return {Integer} Devuelve el número de rows eliminadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteUserByAdmin = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
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
 * @return {Array} Devuelve array con todos los usuarios (objetos) de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
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
 * @param {JSON} email -JSON con el email del usuario a obtener
 * @return {Array} Devuelve array con el usuario (objeto) seleccionado de la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const getUsersByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
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
    email: 'ana@hotmail.com',
    password_hash: 'asafasa567',
    first_name: 'Ana',
    last_name: 'García'
};

//createUser(objUser).then(data=>console.log(data));
/*PRUEBA 2 */
/*const objUpdate = {
    newPass: "safafas9999",
    email: 'juan@hotmail.com'
}*/

//editPasswordByUser(objUpdate).then(data=>console.log(data));

/*PRUEBA 3 const objPassUser = {
    newPass: 'asdafasffa8087',
    email: 'juan@hotmail.com'
}
editPasswordByUser(objPassUser).then(data=>console.log(data));*/

//PRUEBA 4 deleteUserByAdmin('juan@hotmail.com').then(data=>console.log(data));

//PRUEBA 5
//getUsersByEmail('user1@user.com').then(data=>console.log(data))