import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UsuarioAdmin } from './UsuarioAdmin.js';

dotenv.config();

export const loginAdmin = async (req,res)=>{
    try {
        const {usuario, password} = req.body;

        const usuarioAdmin = await UsuarioAdmin.findOne({
            where:{
                usuario
            }
        });

        if(!usuarioAdmin){
            return res.status(404).json({
                message:'Usuario no encontrado'
            });
        }

        const isMatch = await argon2.verify(usuarioAdmin.password, password);

        if(!isMatch){
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        const token =jwt.sign({
            idUsuarioAdmin: usuarioAdmin.idUsuarioAdmin,
            usuario: usuarioAdmin.usuario
        },process.env.JWT_SECRET,{
            expiresIn: '7d'
        });

        res.json({
            message: 'Inicio de sesion exitoso',
            idUsuarioAdmin : usuarioAdmin.idUsuarioAdmin,
            usuario: usuarioAdmin.usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}