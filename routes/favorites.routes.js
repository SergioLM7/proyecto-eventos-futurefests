const express = require('express');
const favoritesControllers = require("../controllers/favorites.controllers");
const router = express.Router();

router.get('/favorites/:user_id?', favoritesControllers.getFavorite);
router.post('/favorites', favoritesControllers.createFavorite);
router.delete('/favorites', favoritesControllers.deleteFavorite);

module.exports = router;