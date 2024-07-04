const express = require('express');
const router = express.Router();
const eventController = require('../controllers/dashboard.controllers');
const middlewares = require ('../middlewares/authorization')

// Ruta para la página principal
router.get('/dashboard', middlewares.verifyToken, middlewares.verifyAdmin, middlewares.verifyHeader, eventController.getEvents);

// Ruta para agregar un evento
//router.post('/add-event', eventController.addEvent);

module.exports = router;