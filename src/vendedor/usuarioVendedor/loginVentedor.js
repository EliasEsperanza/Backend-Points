import { UsuarioVendedor } from "./UsuarioVendedor.js";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginVendedor = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar el usuario con el correo proporcionado
        const usuarioVendedor = await UsuarioVendedor.findOne({
            where: {
                usuario
            }
        });

        // Si no se encontró el usuario, responder con un error
        if (!usuarioVendedor) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada
        const isMatch = await argon2.verify(usuarioVendedor.password, password);

        // Si las contraseñas no coinciden, responder con un error
        if (!isMatch) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        // Crear un token JWT
        const token = jwt.sign({
            idUsuarioVendedor: usuarioVendedor.idUsuarioVendedor,
            usuario: usuarioVendedor.usuario
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Responder con éxito
        res.json({
            message: 'Inicio de sesión exitoso',
            idUsuarioVendedor: usuarioVendedor.idUsuarioVendedor,
            usuario: usuarioVendedor.usuario,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}