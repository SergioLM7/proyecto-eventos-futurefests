const eventsController = require('../controllers/events.controllers');
const router = require('express').Router();

// GET http://localhost:3000/api/events
// GET http://localhost:3000/api/events/mobile+world+congress ?¿?¿?¿
router.get("/events", eventsController.getEvent);

// POST http://localhost:3000/api/events
router.post("/events", eventsController.createEvent);

// PUT http://localhost:3000/api/events/ name???
router.put("/events", eventsController.updateEvent);

// DELETE http://localhost:3000/api/events/  name???
router.delete("/products/", eventsController.deleteEvent);

module.exports = router;