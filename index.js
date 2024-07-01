require('dotenv').config();
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
