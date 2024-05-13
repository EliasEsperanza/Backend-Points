import argon2 from 'argon2';
import { Usuario } from '../Usuario/Usuario.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    try {
        const { correo, passwordHash } = req.body;

        // Buscar el usuario con el correo proporcionado
        const usuario = await Usuario.findOne({
            where: {
                correo
            }
        });

        // Si no se encontró el usuario, responder con un error
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada
        const isMatch = await argon2.verify(usuario.passwordHash, passwordHash);

        // Si las contraseñas no coinciden, responder con un error
        if (!isMatch) {
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        // Crear un token JWT
        const token = jwt.sign({
            idUsuario: usuario.idUsuario,
            correo: usuario.correo
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });


        // Responder con éxito
        res.json({
            message: 'Inicio de sesión exitoso',
            idUsuario: usuario.idUsuario,
            correo: usuario.correo,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}