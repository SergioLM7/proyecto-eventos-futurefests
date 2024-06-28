const queriesUsers = {
    createUser: `INSERT INTO
        users (email, password_hash, first_name, last_name, role_id, is_active)
    VALUES
        ($1,$2,$3,$4,$5,$6)`,
    editRoleByAdmin:`UPDATE
        users
    SET 
        role_id=$1
    WHERE 
        email=$2`,
    editActiveByAdmin: `UPDATE
        users
    SET 
        is_active=$1
    WHERE 
        email=$2`,
    editPasswordByUser: `UPDATE
        users
    SET
        password_hash=$1
    WHERE 
        email=$2`,
    deleteUserByAdmin: `DELETE FROM 
        users
    WHERE 
        email=$1`,
    getAllUsers: `SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        r.role_name,
        u.is_active
    FROM users as u
    INNER JOIN roles as r ON r.role_id = u.role_id
    ORDER BY u.is_active DESC`,
    getUsersByEmail: `SELECT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        r.role_name,
        u.is_active
    FROM users as u
    INNER JOIN roles as r ON r.role_id = u.role_id
    WHERE u.email=$1`
};

module.exports = queriesUsers;
