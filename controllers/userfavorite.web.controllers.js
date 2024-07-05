/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace SQLUserFavWebQueries 
 */

const userFavoriteEntry = require('../models/userFavorite.models');
const eventsService = require('../services/events.services')
const express = require('express');
const jwt = require('jsonwebtoken');

/**
 * Descripción: Esta función obtiene los favoritos de un usuario basado en el token JWT proporcionado en las cookies de la solicitud HTTP.
 * @memberof SQLUserFavWebQueries 
 * @method getUserFavoritesWeb
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express que contiene las cookies y datos necesarios.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al obtener los favoritos del usuario.
 */
const getUserFavoritesWeb = async (req, res) => {
    console.log(req.headers.cookie)
    const { isAuthenticated, role } = req;

    if (!req.headers.cookie) {
        return res.redirect('/')
    }
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("access-token=")).slice(13)
    const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET)

    if (!cookieJWT) {
      return res.status(401).json({ message: 'No token provided' });
    }
      const email = decodificada.email;
      

    await fetch(`https://proyecto-eventos-futurefests.onrender.com/api/userfavorite?email=${email}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then(async favorites => {
            const results = await Promise.all(
                favorites.map(  favorite =>  eventsService.getFavorites(favorite.favorite_id))
            );
            res.render('header.pug', { isAuthenticated, role }, (err, header) => {
                if (err) {
                    console.error('Error rendering header:', err);
                    return res.status(500).send('Error rendering header');
                }
                res.render('favorites.pug', { header, results }); //es una redirección a otra ruta
        })
    });
};


/*const createUserFavoriteWEB = async (req, res) => {
    try {
        const response = await userFavoriteEntry.createUserFavorite(req.body);
        res.status(201).json({
            message: "Relación usuario-favorito creada"
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tabla usuario-favorito', error });
    }
};*/


module.exports = {
    getUserFavoritesWeb
}