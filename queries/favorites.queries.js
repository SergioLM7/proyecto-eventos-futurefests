const queriesFavorites = {
    createFavorite: `INSERT INTO
        favorites (favorite_name, favorite_image, date_start, date_end, favorite_url, favorite_type)
    VALUES
        ($1,$2,$3,$4,$5,$6)`,   
    deleteFavorite: `DELETE FROM 
        favorites
    WHERE 
        favorite_name=$1`,
    getFavoriteByName: `SELECT
        f.favorite_id
    FROM 
        favorites as f
    WHERE 
        f.favorite_name=$1`,
    getFavoriteByUserId: `SELECT
        f.favorite_name,
		f.favorite_image,
		f.date_start,
		f.date_end,
		f.favorite_url,
		f.favorite_type
    FROM 
        favorites as f
    INNER JOIN 
        userfavorite as uf ON uf.favorite_id = f.favorite_id
    WHERE 
        uf.user_id=$1`
};

module.exports = queriesFavorites;
