const express = require('express');
const userFavoriteControllers = require("../controllers/userFavorite.controllers");
const router = express.Router();

router.get('/userfavorite/:email?', userFavoriteControllers.getUserFavorites);
router.post('/userfavorite', userFavoriteControllers.createUserFavorite);
router.delete('/userfavorite', userFavoriteControllers.deleteUserFavorite);

module.exports = router;


/*
fetch http://localhost:3000/api/userfavorite, 
"POST"
body: "email"
"favorite_id"
*/