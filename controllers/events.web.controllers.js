/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace MongoDBWebFunctions 
 */

const Event = require('../services/events.services');

/**
 * Descripción: Esta función llama al modelo getEvents para obtener todos los eventos de la BBDD y renderiza la página de inicio con los eventos obtenidos.
 * @memberof MongoDBWebFunctions 
 * @method getEventWeb 
 * @async 
 * @param {Object} req Objeto de petición HTTP de Express.
 * @param {Object} res Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al realizar la solicitud o al renderizar la página.
 */
const getEventWeb = async (req, res) => {
    const { isAuthenticated, role } = req;

    try {
        const events = await Event.getEvents2();
        res.render('header.pug', { isAuthenticated, role }, (err, header) => {
            if (err) {
                console.error('Error rendering header:', err);
                return res.status(500).send('Error rendering header');
            }
            res.render('home.pug', { header, events });
    });
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("home.pug", {msj:`Error al recuperar los eventos: ${error.stack}`});
    }
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