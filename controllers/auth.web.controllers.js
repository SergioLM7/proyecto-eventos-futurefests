const showLogIn = async (req, res) => {
    try {
        res.status(200).render("login.pug", {msj:"Log In OK"});
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("login.pug", {msj:`Error al cargar el log in: ${error.stack}`});
    }
};

const showRegister = async (req, res) => {
    try {
        res.status(200).render("register.pug", {msj:"Register OK"});
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(500).render("register.pug", {msj:`Error al cargar el registro: ${error.stack}`});
    }
};

module.exports = {
    showLogIn,
    showRegister
}