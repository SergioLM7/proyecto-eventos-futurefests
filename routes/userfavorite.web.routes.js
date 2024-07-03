const express = require('express');
const userfavoriteWEBControllers = require("../controllers/userfavorite.web.controllers");
const router = express.Router();

router.get('/favorites', userfavoriteWEBControllers.getUserFavoritesWeb);

module.exports = router;