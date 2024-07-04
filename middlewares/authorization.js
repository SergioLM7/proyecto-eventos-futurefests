/**
 * @author Luis Carlos, Stephani, Sergio <futurefest.com> 
 * @exports middleware
 * @namespace AuthMiddlewareFunctions 
 */

require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies['access-token'];

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
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("access-token=")).slice(13)
    console.log(cookieJWT)
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
    console.log(decodificada)

    if (decodificada.role_id == 1) {
        next();
    } else {
        res.status(403).json({ message: 'Acceso denegado: zona restringida para administradores' });
    }
};

// Obtener el estado de autenticación y el rol del usuario del token
/*const isAuthenticated = !!req.cookies.token;
let role = 2; // Rol por defecto si no está autenticado

if (isAuthenticated) {
    const token = req.cookies.token;
    const decoded = jwt.decode(token);
    role = decoded.role;
}

// Renderizar la vista con las variables locales
res.render('header', { isAuthenticated, role });*/

const verifyHeader = (req, res, next) => {
    if (!req.cookies['access-token']) {
        req.isAuthenticated = false;
        req.role = null;
        next();
    } else {
        const token = req.cookies['access-token'];
        console.log(token)
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('Invalid token:', err);
                req.isAuthenticated = false;
                req.role = null;
            } else {
                req.user = decoded;
                req.isAuthenticated = true;
                req.role=decoded.role_id;
                console.log('Decoded: ', decoded)
            }
            next();
        });
    }

};


module.exports = {
    verifyToken,
    verifyAdmin,
    verifyHeader
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