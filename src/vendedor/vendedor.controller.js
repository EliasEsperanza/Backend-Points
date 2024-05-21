import { Vendedor } from "./Vendedor.js";
import { UsuarioVendedor } from "./usuarioVendedor/UsuarioVendedor.js";
import CryptoJS from 'crypto-js';
import { sequelize } from "../database/database.js";
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const hashData = async (data, secretKey) => {
    return CryptoJS.AES.encrypt(data, secretKey || process.env.SECRET_KEY).toString();
}

export const createVendedor = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { nombreVendedor, correo, imagenVendedor,idSucursal, usuario, password } = req.body;

        const passwordHash = await hashData(password, process.env.SECRET_KEY);

        // Crear el vendedor
        const vendedor = await Vendedor.create({
            nombreVendedor,
            correo,
            imagenVendedor,
            idSucursal
        }, { transaction: t });

        // Si el vendedor se creó exitosamente, crear el usuario asociado
        if (vendedor) {
            // Crear el usuario vendedor
            const usuarioVendedor = await UsuarioVendedor.create({
                usuario,
                password: passwordHash,
                idVendedor: vendedor.idVendedor
            }, { transaction: t });

            await t.commit();

            // Si el usuario vendedor se creó exitosamente, responder con éxito
            if (usuarioVendedor) {
                res.json({
                    message: 'Vendedor y usuario creados exitosamente',
                    data: { vendedor, usuarioVendedor }
                });
            } else {
                // Si no se pudo crear el usuario vendedor, responder con un error
                res.status(500).json({
                    message: 'Error al crear el usuario vendedor asociado al vendedor'
                });
            }
        } else {
            // Si no se pudo crear el vendedor, responder con un error
            res.status(500).json({
                message: 'Error al crear el vendedor'
            });
        }
    } catch (error) {
        await t.rollback();
        res.status(500).json({
            message: error.message
        });
    }
};

export const getVendedores = async (req, res) => {
    try {
        const vendedores = await Vendedor.findAll();
        res.json({
            data: vendedores
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getVendedorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendedor = await Vendedor.findOne({
            where: {
                idVendedor: id
            }
        });
        res.json({
            data: vendedor
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateVendedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreVendedor, correo, imagenVendedor,idSucursal } = req.body;
        await Vendedor.update({
            nombreVendedor,
            correo,
            imagenVendedor,
            idSucursal
        }, {
            where: {
                idVendedor: id
            }
        });
        res.json({
            message: 'Vendedor actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteVendedor = async (req, res) => {
    try{
        const {id} = req.params;
        const t = await sequelize.transaction();
        await UsuarioVendedor.destroy({
            where: {
                idVendedor: id
            }
        }, { transaction: t });
        const deleteVendedor = await Vendedor.destroy({
            where: {
                idVendedor: id
            }
        }, { transaction: t });
        await t.commit();
        res.json({
            message: 'Vendedor eliminado exitosamente',
            data: deleteVendedor
        });

    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

