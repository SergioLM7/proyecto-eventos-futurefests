const queriesUserFavorite = {
    createUserFavorite: `INSERT INTO
        userfavorite (user_id, favorite_id)
    VALUES
        ((SELECT 
                u.user_id 
            FROM 
                users AS u
            WHERE u.email=$1), $2)`,
    deleteUserFavorite: `DELETE FROM
        userfavorite
    WHERE 
        user_id=(SELECT 
                u.user_id 
            FROM 
                users AS u
            WHERE u.email=$1)
    AND
        favorite_id=$2`,
    getUserFavoritesByEmail: `SELECT
        uf.favorite_id
    FROM 
        userfavorite as uf
    WHERE 
        user_id=(SELECT 
                u.user_id 
            FROM 
                users AS u
            WHERE u.email=$1)`
};

module.exports = queriesUserFavorite;
