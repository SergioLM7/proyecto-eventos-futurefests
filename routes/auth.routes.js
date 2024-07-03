const authControllers = require('../controllers/auth.controllers');
const router = require('express').Router();

router.post('/login/user', authControllers.login)

module.exports = router;
