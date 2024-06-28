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
        type: Date, 
        required: true,
    }, 
    date_end: {
        type: Date, 
        required: true,
    },
    address:{
        type: String, 
        required: true,
    },
    technologies:{
        type: Array, 
        required: true,
    },
    event_type:{
        type: String, 
        required: true,
    },
    price:{
        type: Number, 
        required: true,
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
        required: true,
    },
    participants: {
        type: Number,
        required: true,
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