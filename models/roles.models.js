/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @namespace SQLQueries 
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/roles.queries');


/**
 * Descripción: Esta función crea un rol en la tabla Roles
 * @memberof SQLQueries 
 * @method createRole 
 * @async 
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createRole = async (role) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createRole, [role])
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
const editRole = async (entry) => {
    const { newRole, oldRole } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.editRole, [newRole, oldRole])
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
};


//PRUEBAS
//createRole('admin5').then(data=>console.log(data));
/*PRUEBA 2 const objRoles = {
    newRole: 'admin2',
    oldRole: 'superAdmin'
}
editRole(objRoles).then(data=>console.log(data));*/

module.exports = {
    createRole,
    editRole
}