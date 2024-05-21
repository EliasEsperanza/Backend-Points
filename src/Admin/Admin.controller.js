import { Admin } from './Admin.js';
import { UsuarioAdmin } from './UsuarioAdmin/UsuarioAdmin.js';
import CryptoJS from 'crypto-js';
import { sequelize } from '../database/database.js';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Función para validar los datos de entrada del administrador
const validateAdminData = (data) => {
    const { nombreAdmin, password, idCliente } = data;
    const errors = [];

    if (!nombreAdmin || typeof nombreAdmin !== 'string') {
        errors.push('El nombre del administrador es inválido o está ausente.');
    }

    if (!password || typeof password !== 'string') {
        errors.push('La contraseña es inválida o está ausente.');
    }

    if (!idCliente || typeof idCliente !== 'number') {
        errors.push('El ID del cliente es inválido o está ausente.');
    }

    return errors;
};

const hashData = async (data, secretKey) => {
    return CryptoJS.AES.encrypt(data, secretKey || process.env.SECRET_KEY).toString();
}

// Controlador para crear un nuevo administrador
export const createAdmin = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { nombreAdmin, correo, imagen, idSucursal, usuario, password } = req.body;

        const passwordHash = await hashData(password, process.env.SECRET_KEY);

        // Crear el administrador
        const admin = await Admin.create({
            nombreAdmin,
            correo,
            imagen,
            idSucursal
        }, { transaction: t });

        // Si el administrador se creó exitosamente, crear el usuario asociado
        if (admin) {
            // Crear el usuario administrador
            const usuarioAdmin = await UsuarioAdmin.create({
                usuario,
                password: passwordHash,
                idAdmin: admin.idAdmin
            }, { transaction: t });

            await t.commit();

            // Si el usuario administrador se creó exitosamente, responder con éxito
            if (usuarioAdmin) {
                res.json({
                    message: 'Administrador y usuario creados exitosamente',
                    data: { admin, usuarioAdmin }
                });
            } else {
                // Si no se pudo crear el usuario administrador, responder con un error
                res.status(500).json({
                    message: 'Error al crear el usuario administrador asociado al administrador'
                });
            }
        } else {
            // Si no se pudo crear el administrador, responder con un error
            res.status(500).json({
                message: 'Error al crear el administrador'
            });
        }
    } catch (error) {
        await t.rollback();
        res.status(500).json({
            message: error.message
        });
    }
};

// Controlador para obtener todos los administradores
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        return res.json(admins);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener un administrador por su ID
export const getAdminById = async (req, res) => {
    const adminId = req.params.id;

    try {
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            return res.json(admin);
        } else {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar los datos de un administrador
export const updateAdmin = async (req, res) => {
    const adminId = req.params.id;
    const updatedData = req.body;
    const t = await sequelize.transaction();

    try {
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            // Encriptar los datos actualizados
            const encryptedData = {};
            for (const key in updatedData) {
                encryptedData[key] = await hashData(updatedData[key], process.env.SECRET_KEY);
            }
            const updatedAdmin = await admin.update(encryptedData, { transaction: t });
            await t.commit();
            return res.json(updatedAdmin);
        } else {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        await t.rollback();
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un administrador por su ID
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try{
        await UsuarioAdmin.destroy({ where: { idAdmin: id } }, { transaction: t });

        const deleteAdmin = await Admin.destroy({ where: { idAdmin: id } }, { transaction: t });
        await t.commit();
        res.json({ message: 'Administrador eliminado' });

    }catch(error){
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};
