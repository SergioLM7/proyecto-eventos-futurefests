/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports middleware
 * @namespace AuthMiddlewareFunctions 
 */

require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('JAJAJAJAJAJA')

    const token = req.cookies['jwt'];

    console.log(token)

    if (token) {
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({ message: 'No existe ningún token' });
    }
};

const verifyAdmin = (req, res, next) => {
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        console.log(cookieJWT)
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
        console.log(decodificada)

        if (decodificada.role_id == 1) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado: zona restringida para administradores' }); 
        }
};


module.exports = {
    verifyToken,
    verifyAdmin
};

/*
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
}*/