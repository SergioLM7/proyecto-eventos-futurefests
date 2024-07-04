const eventWebControllers = require('../controllers/events.web.controllers');
const router = require('express').Router();
const middlewares = require('../middlewares/authorization')


router.get('/', middlewares.verifyHeader, eventWebControllers.getEventWeb);


// POST http://localhost:3000/api/search?input=
router.get("/search", eventWebControllers.searchByInput);

module.exports = router;