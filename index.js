require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Rutas
const eventsApiRoutes = require("./routes/events.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

// Conectar a MongoDB Atlas
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');

  // Iniciar el servidor solo si la conexión a MongoDB es exitosa
  app.listen(port, () => {
    console.log({
        text: `Funcionando en: http://localhost:${port}`
      })
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Rutas
//API
app.use('/api',eventsApiRoutes);

