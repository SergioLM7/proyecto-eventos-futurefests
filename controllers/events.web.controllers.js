/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace MongoDBWebFunctions 
 */

const Event = require('../services/events.services');

// READ
/*const getEventWeb = async (req, res) => {
        try {
            const eventData = req.body._id ? { _id: req.body._id } : req.query;
            const events = await Event.getEvents(eventData);
            console.log(events);
            res.status(200).render("home.pug", {events, msj:"Tus eventos"});
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(500).render("home.pug", {msj:`Error al recuperar los eventos: ${error.stack}`});
        }
};*/

/**
 * Descripción: Esta función realiza una solicitud GET a la API de eventos y renderiza la página de inicio con los eventos obtenidos.
 * @memberof MongoDBWebFunctions 
 * @method getEventWeb 
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al realizar la solicitud o al renderizar la página.
 */
const getEventWeb = async (req, res) => {
    
  await fetch("http://localhost:3000/api/events", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((events) => {
      console.log(events);
      res.render("home.pug", {events, msj:`Eventos creados`}); //es una redirección a otra ruta
    });
};

/**
 * Descripción: Esta función busca eventos utilizando el parámetro de entrada proporcionado en la consulta HTTP.
 * 
 * @memberof MongoDBWebFunctions 
 * @method searchByInput 
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express que contiene el parámetro de búsqueda en `req.query.input`.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 */
const searchByInput = async (req, res, next) => {
    const { input } = req.query;

    try {
        const events = await Event.searchByInput(input);
        res.json(events);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    getEventWeb,
    searchByInput
}