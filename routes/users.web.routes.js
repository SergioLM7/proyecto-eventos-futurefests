const express = require('express');
const usersWebControllers = require("../controllers/users.web.controllers");
const router = express.Router();

router.get('/users', usersWebControllers.getUsersAdmin);

module.exports = router;