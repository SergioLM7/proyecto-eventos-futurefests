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
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({ msj: `Error al buscar los eventos: ${error.stack}` });
    }
};

const updateEvent = async(req, res) => {
    try {
        const data = req.body;
        const answer = await eventService.updateEvent(data, { new: true });

        if(answer) {
            res.status(200).send({message: `Se ha actualizado el producto: ${answer.event_name}`, event:answer});
        } else {
            res.status(404).send({message: "Evento no encontrado", event:answer});
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({msj:`ERROR: ${error.stack}`});
    }
};

const deleteEvent = async (req,res) => {
    try{
        const eventName = req.body;
        const answer = await eventService.deleteEvent(eventName.event_name);
        console.log(answer);
        res.status(200).send({message: `Se ha borrado el evento ${eventName.event_name}`});

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).json({msj:`ERROR: ${error.stack}`});
    }
};

module.exports = {
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
};