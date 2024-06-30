const userFavoriteEntry = require('../models/userFavorite.models');

const createUserFavorite = async (req, res) => {
    try {
        const response = await userFavoriteEntry.createUserFavorite(req.body);
        res.status(201).json({
            message: "Relación usuario-favorito creada"
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tabla usuario-favorito', error });
    }
};

const deleteUserFavorite = async (req, res) => {
    try {
        const user = await userFavoriteEntry.deleteUserFavorite(req.body);
        res.status(200).json({ message: `Se ha borrado la relación usuario-favorito.` });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBD" });
    }
};

module.exports = {
    createUserFavorite,
    deleteUserFavorite
};