require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const authentication = require('./controllers/auth.controllers');
const cookieParser = require('cookie-parser');
const session = require("express-session");


// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');
//middleware, para que solo entren adm o public
const authorization = require('./middlewares/authorization');

// Logger
app.use(morgan(':method :host :status - :response-time ms :body'));


/*app.use(cookieParser());
app.use(session({
  secret: 'your_secret_session_key',
  resave: false,
  saveUninitialized: false
}));*/

//Habilitamos carpeta public
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json()); // Habilito recepción de JSON en servidor

//app.use(session({ secret: 'SECRET', resave: false, saveUninitialized: false }));


//Views
app.set('view engine', 'pug');
app.set('views','./views');

// Importar rutas
//API
const eventsApiRoutes = require("./routes/events.routes");
const usersApiRoutes = require("./routes/users.routes");
const userFavoriteApiRoutes = require("./routes/userFavorite.routes");
const authApiRoutes = require('./routes/auth.routes')


//Scraping
const scrapingRoutes = require('./routes/scraper.routes'); 

//WEB
const eventWebRoutes = require ("./routes/events.web.routes");
const authWebRoutes = require("./routes/auth.web.routes");
const userfavoriteWebRoutes = require('./routes/userfavorite.web.routes')
const dashboardWebRoutes = require('./routes/dashboard.routes.js')
const usersWebRoutes = require('./routes/users.web.routes.js')



// Rutas
//API
app.use('/api',eventsApiRoutes);
app.use('/api', usersApiRoutes);
app.use('/api', userFavoriteApiRoutes);
app.use('/api', authApiRoutes);


//Scraping
app.use('/', scrapingRoutes);

//WEB
app.use('/', eventWebRoutes); //HOME
app.use('/', authWebRoutes); //Log In
app.use('/', userfavoriteWebRoutes); //Favorites
app.use('/', dashboardWebRoutes); //Dashboard
app.use('/', usersWebRoutes); //Users


app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);


// Para rutas no existentes
app.use('*',error404);

// Conectar a MongoDB Atlas
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');

  // Iniciar el servidor solo si la conexión a MongoDBAtlas es exitosa
  app.listen(port, () => {
    console.log(`Funcionando en: http://localhost:${port}`)
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Rutas
// app.get("/login", (req, res) => {
//     res.render('login.pug');
// });
// app.get("/register", (req, res) => {
//     res.render('register.pug');
// });
// app.get('/profile', (req, res) => {
//     res.render('register.pug');
// });
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

 app.get("/dashboard", authorization.onlyLogin, (req, res) => {
    res.render('dashboard.pug');
}); 
