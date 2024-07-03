const express = require('express');
const router = express.Router();
const eventController = require('../controllers/dashboard.controllers');

// Ruta para la página principal
router.get('/dashboard', eventController.getEvents);

// Ruta para agregar un evento
//router.post('/add-event', eventController.addEvent);

module.exports = router;