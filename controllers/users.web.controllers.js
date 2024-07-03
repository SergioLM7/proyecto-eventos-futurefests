


const getUsersAdmin = async (req, res) => {
    await fetch(`http://localhost:3000/api/users`)
        .then((res) => res.json())
        .then(users => {
            res.render("users.pug", { users, msj: `Usuarios volcados` }); //es una redirección a otra ruta
        })
};

module.exports = {
    getUsersAdmin
}