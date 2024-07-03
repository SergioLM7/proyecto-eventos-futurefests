const userFavoriteEntry = require('../models/userFavorite.models');
const eventsService = require('../services/events.services')


const getUserFavoritesWeb = async (req, res) => {
    await fetch(`http://localhost:3000/api/userfavorite?email=sergio@admin.com`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then(async favorites => {
            const results = await Promise.all(
                favorites.map( async favorite => await eventsService.getFavorites(favorite.favorite_id))
            );
            res.render("favorites.pug", { results, msj: `Favoritos creados` }); //es una redirección a otra ruta
        })
};

module.exports = {
    getUserFavoritesWeb
}