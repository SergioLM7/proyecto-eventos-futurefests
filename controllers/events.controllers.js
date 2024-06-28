const eventService = require('../services/events.services');


const createEvent = async (req, res) => {
    try {
        const newEvent = await eventService.createEvent(req.body);
        res.status(201).json({ message: `Evento ${newEvent.event_name} creado`, event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
};

const getEvent = async (req, res) => {
    try {
        const events = await service.getAllEvents();
        res.status(200).json(events);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `Error al buscar los eventos: ${error.stack}` });
    }
};

