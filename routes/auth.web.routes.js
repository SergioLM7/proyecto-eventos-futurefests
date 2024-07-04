const authWebControllers = require('../controllers/auth.web.controllers');
const router = require('express').Router();

router.get('/login', authWebControllers.showLogIn);
router.get('/register', authWebControllers.showRegister);

module.exports = router;

