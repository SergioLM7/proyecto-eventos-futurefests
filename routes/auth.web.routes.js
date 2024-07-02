const authWebControllers = require('../controllers/auth.web.controllers');
const router = require('express').Router();

//
//Ojo, tenemos que poner middleware/////authorization.onlyAdm   /// authorization.onlyPublic
router.get('/login', authWebControllers.showLogIn);
router.get('/register', authWebControllers.showRegister);

module.exports = router;

