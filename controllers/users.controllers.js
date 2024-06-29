const usersEntry = require('../models/users.models');

// CREATE Users
// POST http://localhost:3000/api/users
const createUser = async (req, res) => {
    try {
        const response = await usersEntry.createUser(req.body);
        res.status(201).json({
            message: `usuario creado: ${req.body.email}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// GET http://localhost:3000/api/users --> ALL
// GET http://localhost:3000/api/users?email= --> by Email in Body
// GET http://localhost:3000/api/users?email= --> by Email in Query
const getUsers = async (req, res) => {
    let users;
    try {
        if (req.body.email) {
            //Meter el validador del GET
            users = await usersEntry.getUsersByEmail(req.body.email);
        } else if (req.query.email) {
            //Meter el validador del GET
            users = await usersEntry.getUsersByEmail(req.query.email);
        } else {
            //Meter el validador del GET
            users = await usersEntry.getAllUsers();
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

// DELETE http://localhost:3000/api/users --> By email in body
// DELETE http://localhost:3000/api/users?email= --> By email in query
const deleteUser = async (req, res) => {
    let user;
    try {
        if (req.body.email) {
            user = await usersEntry.deleteUserByAdmin(req.body.email);
            res.status(200).json({ message: `Se ha borrado el usuario ${req.body.email}.` });
        } else if (req.query.email) {
            user = await usersEntry.deleteUserByAdmin(req.query.email);
            res.status(200).json({ message: `Se ha borrado el usuario ${req.query.email}.` });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBD" });
    }
};

const updateUsers = async (req, res) => {
    console.log(req.body)
   try {
            console.log(req.body)
            const response = await usersEntry.editUser(req.body);
            console.log(response)
            res.status(201).json({
                items_updated: response.rowCount,
                message: `Se ha modificado el usuario ${response.email}`
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
};

const updatePassword = async (req, res) => {
    if (req.body.password_hash) {
        console.log(req.body)
        try {
            const response = await usersEntry.editPasswordByUser(req.body);
            console.log(response)
            res.status(201).json({
                items_updated: response.rowCount,
                message: `Se ha modificado la contraseña del usuario ${response.email}`
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUsers,
    updatePassword
};