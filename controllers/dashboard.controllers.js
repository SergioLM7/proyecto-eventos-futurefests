/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports controllers
 * @namespace dashboardFunctions
 */

const Event = require('../services/events.services');
  
/**
 * Descripcion: esta función realiza una solicitud GET a la API de eventos y renderiza una página de dashboard con los eventos obtenidos.
 * @memberof dashboardFunctions
 * @async
 * @function getEvents
 * @param {Object} req - Objeto de petición HTTP de Express.
 * @param {Object} res - Objeto de respuesta HTTP de Express.
 * @throws {Error} Error al realizar la solicitud o al renderizar la página.
 */
const getEvents = async(req, res) => {
    await fetch("http://localhost:3000/api/events", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((events) => {
          console.log(events);
          res.render("dashboard.pug", {events, msj:`Eventos creados`}); //es una redirección a otra ruta
        });
  };
  
// const addEvent = (req, res) => {
//     const { event_name, description, date_start, date_end, poster, url } = req.body;
//     events.push({ event_name, description, date_start, date_end, poster, url });
//     res.redirect('/dashboard');
//   };

module.exports = {
    getEvents,
    //addEvent
}