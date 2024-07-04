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
  const { isAuthenticated, role } = req;

    try {
        const events = await Event.getEvents2();
        res.render('header.pug', { isAuthenticated, role }, (err, header) => {
            if (err) {
                console.error('Error rendering header:', err);
                return res.status(500).send('Error rendering header');
            }
            res.render('dashboard.pug', { header, events });
    });
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("dahsboard.pug", {msj:`Error al recuperar los eventos: ${error.stack}`});
    }
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