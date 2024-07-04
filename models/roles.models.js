/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @namespace RolesFunctions
 */

const pool = require('../config/db_pgsql');
const queries = require('../queries/roles.queries');


/**
 * Descripción: Esta función crea un rol en la tabla Roles
 * @memberof RolesFunctions 
 * @method createRole 
 * @async 
 * @param {String} role - Una cadena de texto con el nombre del rol a crear
 * @return {Integer} Devuelve el número de rows creadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const createRole = async (role) => {
    let client, result;
    try {
        client = await pool.connect();
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
 * @memberof RolesFunctions 
 * @method editRole 
 * @async
 * @param {JSON} entry - Un JSON con el nuevo nombre del rol y con el nombre antiguo.
 * @return {Integer} Devuelve el número de rows editadas en la tabla
 * @throws {Error} Error de consulta a la BBDD
 */
const editRole = async (entry) => {
    const { newRole, oldRole } = entry;
    let client, result;
    try {
        client = await pool.connect();
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

module.exports = {
    createRole,
    editRole
};


//PRUEBAS
//createRole('admin5').then(data=>console.log(data));
/*PRUEBA 2 const objRoles = {
    newRole: 'admin2',
    oldRole: 'superAdmin'
}
editRole(objRoles).then(data=>console.log(data));*/