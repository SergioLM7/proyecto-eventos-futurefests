const express = require('express');
const usersControllers = require("../controllers/users.controllers");
const authControllers = require('../controllers/auth.controllers');

const router = express.Router();

router.get('/users/:email?', usersControllers.getUsers);
router.post('/users', authControllers.register);
router.delete('/users/:email?', usersControllers.deleteUser);
router.put('/users', usersControllers.updateUsers);
router.put('/users/pass', usersControllers.updatePassword);

module.exports = router;