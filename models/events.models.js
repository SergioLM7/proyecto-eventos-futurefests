/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports models
 * @namespace MongoDBSchemas 
 */

/**
 * Descripción: Esquema Mongoose para la colección de eventos.
 * @memberof MongoDBSchemas
 */
const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objSchema = {
    event_name: { 
        type: String, 
        required: true,
        unique: true 
    },
    description: { 
        type: String, 
        required: true,
    },
    date_start: {
        type: String, 
        required: true,
    }, 
    date_end: {
        type: String, 
        required: true,
    },
    address:{
        type: String, 
        required: false,
    },
    technologies:{
        type: Array, 
        required: false,
    },
    event_type:{
        type: String, 
        required: false,
    },
    price:{
        type: Number, 
        required: false,
    },
    url: { 
        type: String, 
        required: true,
        validate: {
            validator: (url) => {
                const regexp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
                if(regexp.test(url))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Formato de URL incorrecto."
        }
    },
    speakers: {
        type: Array, 
        required: false,
    },
    participants: {
        type: Number,
        required: false,
    },
    poster: {
        type: String,
        required: true,
        validate: {
            validator: (url) => {
                const regexp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
                if(regexp.test(url))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Formato de URL incorrecto."
        }
    }
};
// Crear el esquema
const eventSchema = mongoose.Schema(objSchema);

// Crear el modelo --> Colección
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;