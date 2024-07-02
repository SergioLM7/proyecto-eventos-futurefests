require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
//
const { usuarios } = require('../controllers/auth.controllers.js')

const onlyLogin = (req, res, next) => {
    const logueado = revisarCookie(req)
    console.log("estas en zona reservvada para logueados")
    if(logueado) return next;
    return res.redirect("/");
}

const onlyPublic = (req, res, next) => {
    const logueado = revisarCookie(req)
    if(!logueado) return next;
    return res.redirect("/");
}

const onlyAdmin = (req, res, next) => {

}

const revisarCookie = () => {
try{
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
    const usuarioAResvisar = usuarios.find(usuario => usuario.email === decodificada.email);
    if (!usuarioAResvisar) {
        return false;
    } else { true }
}
catch{
    return false;
}
}

module.exports = {
    onlyLogin,
    onlyAdmin,
    onlyPublic
};
