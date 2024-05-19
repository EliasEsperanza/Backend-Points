import { Usuario as UsuarioCliente } from "../Usuario/Usuario.js";
import { UsuarioVendedor } from "../vendedor/usuarioVendedor/UsuarioVendedor.js";
import { UsuarioAdmin } from "../Admin/UsuarioAdmin/UsuarioAdmin.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Función para agregar un token a la base de datos
const addValidTokenToDB = async (userId, token, userType) => {
    if (userType === 'cliente') {
        await UsuarioCliente.update({ token }, { where: { idUsuario: userId } });
    } else if (userType === 'vendedor') {
        await UsuarioVendedor.update({ token }, { where: { idUsuarioVendedor: userId } });
    } else if (userType === 'admin') {
        await UsuarioAdmin.update({ token }, { where: { idUsuarioAdmin: userId } });
    }
};

// Función para eliminar un token de la base de datos al hacer logout
const removeValidTokenFromDB = async (userId, userType) => {
    if (userType === 'cliente') {
        await UsuarioCliente.update({ token: null }, { where: { idUsuario: userId } });
    } else if (userType === 'vendedor') {
        await UsuarioVendedor.update({ token: null }, { where: { idUsuarioVendedor: userId } });
    } else if (userType === 'admin') {
        await UsuarioAdmin.update({ token: null }, { where: { idUsuarioAdmin: userId } });
    }
};

// Función para desencriptar datos
const decryptData = async (hash, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(hash, secretKey || process.env.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Función para comparar datos desencriptados
const compareHashedData = async (data, encryptedData) => {
    const decryptedData = await decryptData(encryptedData, process.env.SECRET_KEY);
    return data === decryptedData;
};

export const login = async (req, res) => {
    try {
        const { correo, usuario, password } = req.body;

        if (correo) {
            // Usuario cliente
            const usuarioCliente = await UsuarioCliente.findOne({ where: { correo } });

            if (!usuarioCliente) {
                return res.status(404).json({ message: 'Usuario cliente no encontrado' });
            }

            const isMatch = await compareHashedData(password, usuarioCliente.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                {
                    idUsuario: usuarioCliente.idUsuario,
                    correo: usuarioCliente.correo,
                    rol: 'Cliente'
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            await addValidTokenToDB(usuarioCliente.idUsuario, token, 'cliente');
            return res.json({
                message: 'Inicio de sesión exitoso',
                idUsuario: usuarioCliente.idUsuario,
                correo: usuarioCliente.correo,
                rol: 'Cliente',
                token
            });

        } else if (usuario) {
            // Usuario vendedor o admin
            let usuarioVendedor = await UsuarioVendedor.findOne({ where: { usuario } });
            let usuarioAdmin = await UsuarioAdmin.findOne({ where: { usuario } });

            if (!usuarioVendedor && !usuarioAdmin) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (usuarioVendedor) {
                const isMatch = await compareHashedData(password, usuarioVendedor.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }

                const token = jwt.sign(
                    {
                        idUsuarioVendedor: usuarioVendedor.idUsuarioVendedor,
                        usuario: usuarioVendedor.usuario,
                        rol: usuarioVendedor.rol
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                await addValidTokenToDB(usuarioVendedor.idUsuarioVendedor, token, 'vendedor');
                return res.json({
                    message: 'Inicio de sesión exitoso',
                    idUsuarioVendedor: usuarioVendedor.idUsuarioVendedor,
                    usuario: usuarioVendedor.usuario,
                    rol: usuarioVendedor.rol,
                    token
                });

            } else if (usuarioAdmin) {
                const isMatch = await compareHashedData(password, usuarioAdmin.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }

                const token = jwt.sign(
                    {
                        idUsuarioAdmin: usuarioAdmin.idUsuarioAdmin,
                        usuario: usuarioAdmin.usuario,
                        rol: usuarioAdmin.rol
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                await addValidTokenToDB(usuarioAdmin.idUsuarioAdmin, token, 'admin');
                return res.json({
                    message: 'Inicio de sesión exitoso',
                    idUsuarioAdmin: usuarioAdmin.idUsuarioAdmin,
                    usuario: usuarioAdmin.usuario,
                    rol: usuarioAdmin.rol,
                    token
                });
            }
        } else {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const { idUsuario, idUsuarioVendedor, idUsuarioAdmin, userType } = req.body;

        if (userType === 'cliente') {
            await removeValidTokenFromDB(idUsuario, userType);
        } else if (userType === 'vendedor') {
            await removeValidTokenFromDB(idUsuarioVendedor, userType);
        } else if (userType === 'admin') {
            await removeValidTokenFromDB(idUsuarioAdmin, userType);
        }

        res.json({ message: 'Se ha cerrado la sesión correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

