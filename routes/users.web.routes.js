const express = require('express');
const usersWebControllers = require("../controllers/users.web.controllers");
const router = express.Router();
const middlewares = require('../middlewares/authorization')

router.get('/users', middlewares.verifyToken, middlewares.verifyAdmin, middlewares.verifyHeader, usersWebControllers.getUsersAdmin);

module.exports = router;