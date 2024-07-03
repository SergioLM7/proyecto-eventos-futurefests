const Event = require('../services/events.services');
  
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