const Event = require('../services/events.services');

// READ
const getEventWeb = async (req, res) => {
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
};

module.exports = {
    getEventWeb
}