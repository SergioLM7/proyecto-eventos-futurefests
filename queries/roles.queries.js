const queriesRoles = {
    createRole: `INSERT INTO
        roles (role_name)
    VALUES
        ($1)`,
    editRole:`UPDATE
        roles
    SET role_name=$1
    WHERE role_name=$2`
};

module.exports = queriesRoles;
