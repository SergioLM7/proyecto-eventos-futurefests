const eventWebControllers = require('../controllers/events.web.controllers');
const router = require('express').Router();

router.get('/', eventWebControllers.getEventWeb);


// POST http://localhost:3000/api/search?input=
router.get("/search", eventWebControllers.searchByInput);

module.exports = router;