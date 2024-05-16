import { Usuario as UsuarioCliente } from "../Usuario/Usuario.js";
import { UsuarioVendedor } from "../vendedor/usuarioVendedor/UsuarioVendedor.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import argon2 from 'argon2';

dotenv.config();

// Función para agregar un token a la base de datos
const addValidTokenToDB = async (userId, token, userType) => {
    if (userType === 'cliente') {
        await UsuarioCliente.update({ token }, { where: { idUsuario: userId } });
    } else if (userType === 'vendedor') {
        await UsuarioVendedor.update({ token }, { where: { idUsuarioVendedor: userId } });
    }
};

// Función para eliminar un token de la base de datos al hacer logout
const removeValidTokenFromDB = async (userId, userType) => {
    if (userType === 'cliente') {
        await UsuarioCliente.update({ token: null }, { where: { idUsuario: userId } });
    } else if (userType === 'vendedor') {
        await UsuarioVendedor.update({ token: null }, { where: { idUsuarioVendedor: userId } });
    }
};

export const login = async (req, res) => {
    try {
        const { correo, usuario, password } = req.body;
        let userType = '';

        // Verificar si es usuario cliente o vendedor
        if (correo) {
            userType = 'cliente';
            // Buscar el usuario cliente con el correo proporcionado
            const usuarioCliente = await UsuarioCliente.findOne({ where: { correo } });

            if (!usuarioCliente) {
                return res.status(404).json({ message: 'Usuario cliente no encontrado' });
            }

            const isMatch = await argon2.verify(usuarioCliente.passwordHash, password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                {
                    idUsuario: usuarioCliente.idUsuario,
                    correo: usuarioCliente.correo
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Agregar el token a la base de datos
            await addValidTokenToDB(usuarioCliente.idUsuario, token, userType);

            res.json({
                message: 'Inicio de sesión exitoso',
                idUsuario: usuarioCliente.idUsuario,
                correo: usuarioCliente.correo,
                token
            });
        } else if (usuario) {
            userType = 'vendedor';
            // Buscar el usuario vendedor con el usuario proporcionado
            const usuarioVendedor = await UsuarioVendedor.findOne({ where: { usuario } });

            if (!usuarioVendedor) {
                return res.status(404).json({ message: 'Usuario vendedor no encontrado' });
            }

            const isMatch = await argon2.verify(usuarioVendedor.password, password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                {
                    idUsuarioVendedor: usuarioVendedor.idUsuarioVendedor,
                    usuario: usuarioVendedor.usuario
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            // Agregar el token a la base de datos
            await addValidTokenToDB(usuarioVendedor.idUsuarioVendedor, token, userType);

            res.json({
                message: 'Inicio de sesión exitoso',
                idUsuarioVendedor: usuarioVendedor.idUsuarioVendedor,
                usuario: usuarioVendedor.usuario,
                token
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const { idUsuario, idUsuarioVendedor, userType } = req.body;

        if (userType === 'cliente') {
            // Eliminar el token de la base de datos para usuario cliente
            await removeValidTokenFromDB(idUsuario, userType);
        } else if (userType === 'vendedor') {
            // Eliminar el token de la base de datos para usuario vendedor
            await removeValidTokenFromDB(idUsuarioVendedor, userType);
        }

        res.json({ message: 'Se ha cerrado la sesión correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
