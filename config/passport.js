require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configura Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.ID_CLIENTE,
    clientSecret: process.env.SECRETO_CLIENTE,
    callbackURL: "/google/callBack"
}, function (token, tokenSecret, profile, done) {
    // En esta función puedes manejar la búsqueda/creación de usuarios en tu base de datos
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});