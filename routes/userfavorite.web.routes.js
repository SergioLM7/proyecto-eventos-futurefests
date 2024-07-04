const express = require('express');
const userfavoriteWEBControllers = require("../controllers/userfavorite.web.controllers");
const router = express.Router();
const middlewares = require('../middlewares/authorization')

router.get('/favorites', middlewares.verifyToken, middlewares.verifyHeader, userfavoriteWEBControllers.getUserFavoritesWeb);

module.exports = router;