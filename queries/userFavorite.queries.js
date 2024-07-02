const queriesUserFavorite = {
    createUserFavorite: `INSERT INTO
        userfavorite (user_id, favorite_id)
    VALUES
        ($1, $2)`,
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
    getUserFavoritesByID: `SELECT
        uf.favorite_id
    FROM 
        userfavorite as uf
    WHERE 
        uf.user_id=$1`
};

module.exports = queriesUserFavorite;
