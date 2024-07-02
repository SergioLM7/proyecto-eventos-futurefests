/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace MongoDBFunctions 
 */

const eventService = require('../services/events.services');

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/events al método createEvent
 * Este espera recibir por body un JSON con todos los campos del evento.
 * @memberof MongoDBFunctions 
 * @method createEvent 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al crear el evento
 */
const createEvent = async (req, res) => {
    try {
        const newEvent = await eventService.createEvent(req.body);
        res.status(201).json({ message: `Evento ${newEvent.event_name} creado`, event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/events al método getEvent
 * @memberof MongoDBFunctions 
 * @method getEvent 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al buscar los eventos
 */
const getEvent = async (req, res) => {
    try {
        const eventData = req.body._id ? { _id: req.body._id } : req.query;
        const events = await eventService.getEvents(eventData);
        res.status(200).json(events);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `Error al buscar los eventos: ${error.stack}` });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/events al método updateEvent
 * Este espera recibir por body los campos a modificar del evento
 * @memberof MongoDBFunctions 
 * @method updateEvent 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al actualizar el evento
 */
const updateEvent = async (req, res) => {
    try {
        const data = req.body;
        const answer = await eventService.updateEvent(data, { new: true });

        if (answer) {
            res.status(200).send({ message: `Se ha actualizado el producto: ${answer.event_name}`, event: answer });
        } else {
            res.status(404).send({ message: "Evento no encontrado", event: answer });
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * Descripción: Esta función llama desde la ruta http://localhost:3000/api/events al método deleteEvent
 * Este espera recibir por body el nombre del evento a eliminar
 * @memberof MongoDBFunctions 
 * @method deleteEvent 
 * @async 
 * @param {Object} req objeto de petición HTTP
 * @param {Object} res objeto de respuesta HTTP
 * @throws {Error} Error al eliminar el evento
 */
const deleteEvent = async (req, res) => {
    try {
        const eventName = req.body;
        const answer = await eventService.deleteEvent(eventName.event_name);
        res.status(200).send({ message: `Se ha borrado el evento ${eventName.event_name}` });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `ERROR: ${error.stack}` });
    }
};


module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
};