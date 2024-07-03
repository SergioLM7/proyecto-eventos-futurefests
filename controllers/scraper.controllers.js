const scraperEvent = require('../utils/scraper.eventbrite')
const scraperNferias = require('../utils/scraper.nferias')

const getEventsEventBrite = async (req, res) => {
    try {
         const eventos = await scraperEvent.scrap("https://www.eventbrite.es/d/spain/software-conference/"); 
        res.status(200).json(eventos);

    } catch (error) {
        res.status(404).json({})
    }

};

const getEventsNFerias = async (req, res) => {
    try {
         const eventos = await scraperNferias.scrap("https://www.nferias.com/tecnologia/espana/"); 
        res.status(200).json(eventos);

    } catch (error) {
        res.status(404).json({})    
    }

};

module.exports = {
    getEventsEventBrite,
    getEventsNFerias
}