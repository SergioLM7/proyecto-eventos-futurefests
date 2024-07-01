const eventWebControllers = require('../controllers/events.web.controllers');
const router = require('express').Router();

router.get('/', eventWebControllers.getEventWeb);

module.exports = router;