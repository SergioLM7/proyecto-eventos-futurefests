const userFavoriteEntry = require('../models/userFavorite.models');
const eventsService = require('../services/events.services')
const express = require('express');
const jwt = require('jsonwebtoken');


const getUserFavoritesWeb = async (req, res) => {
    console.log(req.headers.cookie)
    if (!req.headers.cookie) {
        return res.redirect('/')
    }
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
    const decodificada = jwt.verify(cookieJWT, process.env.JWT_SECRET)

    if (!cookieJWT) {
      return res.status(401).json({ message: 'No token provided' });
    }
      const email = decodificada.email;

    await fetch(`http://localhost:3000/api/userfavorite?email=${email}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then(async favorites => {
            const results = await Promise.all(
                favorites.map(  favorite =>  eventsService.getFavorites(favorite.favorite_id))
            );
            res.render("favorites.pug", { results, msj: `Favoritos creados` }); //es una redirección a otra ruta
        })
};


const createUserFavoriteWEB = async (req, res) => {
   

    try {
        const response = await userFavoriteEntry.createUserFavorite(req.body);
        res.status(201).json({
            message: "Relación usuario-favorito creada"
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tabla usuario-favorito', error });
    }
};


module.exports = {
    getUserFavoritesWeb
}