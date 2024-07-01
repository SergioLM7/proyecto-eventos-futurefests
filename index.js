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

//Habilitamos carpeta public
app.use(express.static('public'));

//Views
app.set('view engine', 'pug');
app.set('views','./views');


// Rutas
//API
const eventsApiRoutes = require("./routes/events.routes");
const usersApiRoutes = require("./routes/users.routes");
const userFavoriteApiRoutes = require("./routes/userFavorite.routes");
const favoritesApiRoutes = require ("./routes/favorites.routes");

//WEB
const eventWebRoutes = require ("./routes/events.web.routes");
const authWebRoutes = require("./routes/auth.web.routes");

app.use(express.urlencoded({extended:true}));
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
app.use('/api',userFavoriteApiRoutes);
app.use('/api', favoritesApiRoutes);

//WEB
app.use('/', eventWebRoutes); //HOME
app.use('/', authWebRoutes); //Log In

// Para rutas no existentes
app.use('*',error404);require('dotenv').config();
const express = require("express");
const path = require('path');
const authentication = require('./controllers/auth.controllers');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;


const viewsDirectory = path.join(__dirname, 'views');


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true }));

//Configuracion vistas Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas
app.get("/login", (req, res) => {
    res.render('login.pug');
});
app.get("/register", (req, res) => {
    res.render('register.pug');
});
app.get('/profile', (req, res) => {
    res.render('register.pug');
});
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

app.get("/dashboard", (req, res) => {
    res.render('dashboard.pug');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
