/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace ScraperFunctions 
 */
const scraperEvent = require('../utils/scraper.eventbrite')
const scraperNferias = require('../utils/scraper.nferias')

/**
 * Descripción: Esta función obtiene eventos de Eventbrite utilizando un scraper para extraer datos de una URL específica.
 * @memberof ScraperFunctions 
 * @method getEventsEventBrite 
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al obtener eventos de Eventbrite.
 */
const getEventsEventBrite = async (req, res) => {
    try {
         const eventos = await scraperEvent.scrap("https://www.eventbrite.es/d/spain/software-conference/"); 
        res.status(200).json(eventos);
    } catch (error) {
        res.status(404).json({})
    }
};

/**
 * Descripción: Esta función Obtiene eventos de la página Nferias utilizando un scraper para extraer datos de una URL específica.
 * @memberof ScraperFunctions 
 * @method getEventsEventBrite 
 * @async 
 * @param {Object} req objeto de petición HTTP de Express.
 * @param {Object} res objeto de respuesta HTTP de Express.
 * @throws {Error} Error al obtener eventos de Eventbrite.
 */
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