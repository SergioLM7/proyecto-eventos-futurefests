/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports services
 * @memberof MongoDBFunctions 
 */

const Event = require('../models/events.models');

/**
 * Descripción: Esta función crea un evento
 * @memberof MongoDBFunctions 
 * @method createEvent 
 * @async 
 * @param {JSON} eventData -JSON con todos los campos para crear un evento
 * @return {Object} -El objeto del evento creado con todos sus campos
 * @throws {Error} Error al crear el evento
 */
const createEvent = async (eventData) => {
    try {
        const newEvent = new Event(eventData);
        return await newEvent.save();
    } catch (error) {
        console.error('Error al crear el evento:', error.message);
        throw new Error('Error al crear el evento');
    }
};

/**
 * Descripción: Esta función obtiene todos los eventos existentes
 * @memberof MongoDBFunctions 
 * @method getAllEvents 
 * @async 
 * @throws {Error} Error al obtener todos los eventos
 */
const getAllEvents = async () => {
    try {
        return await Event.find();
    } catch (error) {
        throw new Error('Error al obtener los eventos');
    }
};

/**
 * Descripción: Esta función actualiza un evento
 * @memberof MongoDBFunctions 
 * @method updateEvent 
 * @async 
 * @param {JSON} eventData -JSON con todos los campos a editar de un evento
 * @return {Object} -El objeto del evento actualizado con todos sus campos
 * @throws {Error} Error al actualizar el evento
 */
const updateEvent = async (eventData) => {
    try {
        return await Event.findOneAndUpdate({ event_name: eventData.event_name }, eventData, { new: true });
    } catch (error) {
        throw new Error('Error al actualizar el evento');
    }
};

/**
 * Descripción: Esta función elimina un evento
 * @memberof MongoDBFunctions 
 * @method deleteEvent 
 * @async 
 * @param {JSON} eventName -JSON con el nombre del evento a eliminar
 * @return {Object} -Un objeto con el número de filas eliminadas y acknowledged: true
 * @throws {Error} Error al eliminar el evento
 */
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
    event_name: "Devops Barcelona 2023",
    description: "Una feria única en una ciudad única",
    date_start: "2023-11-14",
    date_end: "2023-11-15",
    address: "Gran Via de les Corts Catalanes, 521, Barcelona",
    technologies: ["AI", "DevOps"],
    event_type: "Feria",
    price: 299,
    url: "https://devops.barcelona.com",
    speakers: [
        {
            name: "Juan Palacios",
            bio: "Expert in AI and Machine Learning",
            company: "TechCorp"
        },
        {
            name: "Jaime De La Vega",
            bio: "Blockchain Developer",
            company: "Blockchain Inc."
        }
    ],
    participants: 2000,
    poster: "https://cdn.slidesharecdn.com/ss_thumbnails/devops-intro-180409201218-thumbnail.jpg"
};*/

/*const objUpdate = {
    event_name: "Mobile World Congress 2025",
    address: "C/Monalisa, 21, Barcelona, Spain",
    event_type: "Congreso",
    price: 9.99,
    url: "http://www.eventazo.com",
    participants: 900,
    poster: "https://event-assets.gsma.com/Header-Images/_1200x630_crop_center-center_82_none/MWC_GSMA_IMAGE.png"
};*/


//createEvent(objPrueba).then(data=> console.log(data));
deleteEvent('Devops Barcelona 2023').then(data => console.log(data));
//updateEvent(objUpdate).then(data=>console.log(data));