const Event = require('../models/events.models');

const createEvent = async (eventData) => {
    try {
        const newEvent = new Event(eventData);
        return await newEvent.save();
    } catch (error) {
        console.error('Error al crear el evento:', error.message);
        throw new Error('Error al crear el evento');
    }
};


const getAllEvents = async () => {
    try {
        return await Event.find();
    } catch (error) {
        throw new Error('Error al obtener los eventos');
    }
};


const updateEvent = async (eventData) => {
    try {
        return await Event.findOneAndUpdate({ event_name: eventData.event_name }, eventData, { new: true });
    } catch (error) {
        throw new Error('Error al actualizar el evento');
    }
};

const deleteEvent = async (eventName) => {
    try {
        return await Event.deleteOne({event_name: eventName});
    } catch (error) {
        throw new Error('Error al eliminar el evento');
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent
};

//PRUEBAS
/*const objPrueba = {
    event_name: "Mobile World Congress 2025",
    description: "A conference about the latest in technology.",
    date_start: "2024-06-02",
    date_end: "2024-06-07",
    address: "C/Llobregat, 21, Barcelona, Spain",
    technologies: ["AI", "Full Stack Development", "Cybersecurity"],
    event_type: "Feria",
    price: 199.99,
    url: "http://www.evento.com",
    speakers: [
        {
            name: "John Doe",
            bio: "Expert in AI and Machine Learning",
            company: "TechCorp"
        },
        {
            name: "Jane Smith",
            bio: "Blockchain Developer",
            company: "Blockchain Inc."
        }
    ],
    participants: 1000,
    poster: "https://mobile2024.com/poster.jpg"
};*/

/*const objUpdate = {
    event_name: "Mobile World Congress 2025",
    address: "C/Monalisa, 21, Barcelona, Spain",
    event_type: "Congreso",
    price: 9.99,
    url: "http://www.eventazo.com",
    participants: 900,
    poster: "https://mobile2025.com/poster.jpg"
};*/

//createEvent(objPrueba).then(data=> console.log(data));
//deleteEvent('Mobile World Congress').then(data => console.log(data));