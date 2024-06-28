const queriesUserFavorite = {
    createUserFavorite: `INSERT INTO
        userfavorite (user_id, favorite_id)
    VALUES
        ($1, $2)`,
    deleteUserFavorite:`DELETE FROM
        userfavorite
    WHERE 
        user_id=$1
    AND
        favorite_id=$2`
};

module.exports = queriesUserFavorite;
