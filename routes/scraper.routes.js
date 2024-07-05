const express = require('express')
const scraper = require('../controllers/scraper.controllers') // Importamos el controlador

const router = express.Router()

router.get('/scraping/eventbrite',scraper.getEventsEventBrite);
router.get('/scraping/nferias',scraper.getEventsNFerias);


module.exports = router;