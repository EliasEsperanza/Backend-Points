import { Usuario } from "./Usuario.js";

export const createUsuario = async (req, res) => {
    try {
        const { idCliente, correo, passwordHash } = req.body;
        const usuario = await Usuario.create({
            idCliente,
            correo,
            passwordHash
        });
        res.json({
            message: 'Usuario creado exitosamente',
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({
            where: {
                idUsuario: id
            }
        });
        res.json({
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { idCliente, correo, passwordHash } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                idUsuario: id
            }
        });
        await usuario.update({
            idCliente,
            correo,
            passwordHash
        });
        res.json({
            message: 'Usuario actualizado exitosamente',
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({
            where: {
                idUsuario: id
            }
        });
        await usuario.destroy();
        res.json({
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
