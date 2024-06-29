require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Logger
app.use(morgan(':method :host :status - :response-time ms :body'));

// Rutas
const eventsApiRoutes = require("./routes/events.routes")
const usersApiRoutes = require("./routes/users.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

// Conectar a MongoDB Atlas
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');

  // Iniciar el servidor solo si la conexión a AtlasDB es exitosa
  app.listen(port, () => {
    console.log(`Funcionando en: http://localhost:${port}`)
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Rutas
//API
app.use('/api',eventsApiRoutes);
app.use('/api', usersApiRoutes);

// Para rutas no existentes
app.use('*',error404);