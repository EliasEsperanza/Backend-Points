import { Vendedor } from "./Vendedor.js";
import { UsuarioVendedor } from "./usuarioVendedor/UsuarioVendedor.js";
import argon2 from 'argon2';
import { sequelize } from "../database/database.js";

const dataHash = async (data) => {
    return await argon2.hash(data);
}

export const createVendedor = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { nombreVendedor, correo, telefono, direccion, dui, nit, nrc, idSucursal, usuario, password } = req.body;

        const passwordHash = await dataHash(password);

        // Crear el vendedor
        const vendedor = await Vendedor.create({
            nombreVendedor,
            correo,
            telefono,
            direccion,
            dui,
            nit,
            nrc,
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
        const { nombreVendedor, correo, telefono, direccion, dui, nit, nrc, idSucursal } = req.body;
        const vendedor = await Vendedor.findOne({
            where: {
                idVendedor: id
            }
        });
        await vendedor.update({
            nombreVendedor,
            correo,
            telefono,
            direccion,
            dui,
            nit,
            nrc,
            idSucursal
        });
        res.json({
            message: 'Vendedor actualizado exitosamente',
            data: vendedor
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteVendedor = async (req, res) => {
    try {
        const { id } = req.params;
        await Vendedor.destroy({
            where: {
                idVendedor: id
            }
        });
        res.json({
            message: 'Vendedor eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

