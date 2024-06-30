const express = require('express');
const userFavoriteControllers = require("../controllers/userFavorite.controllers");
const router = express.Router();

//router.get('/users/:email?', );
router.post('/userFavorite', userFavoriteControllers.createUserFavorite);
router.delete('/userFavorite', userFavoriteControllers.deleteUserFavorite);

module.exports = router;