import { Vendedor } from "./Vendedor.js";
import argon2 from 'argon2';

const dataHash = async (data) => {
    return await argon2.hash(data);
}

createVendedor = async (req, res) => {
    try {
        const { nombreVendedor, correo, telefono, direccion, dui, nit, nrc, idSucursal } = req.body;

        const telefonoHash = await dataHash(telefono);
        const duiHash = await dataHash(dui);
        const nitHash = await dataHash(nit);
        const nrcHash = await dataHash(nrc);
        const direccionHash = await dataHash(direccion);

        const vendedor = await Vendedor.create({
            nombreVendedor,
            correo,
            telefono: telefonoHash,
            direccion: direccionHash,
            dui: duiHash,
            nit: nitHash,
            nrc: nrcHash,
            idSucursal
        });
        res.json({
            message: 'Vendedor creado exitosamente',
            data: vendedor
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

getVendedores = async (req, res) => {
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

getVendedorById = async (req, res) => {
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

updateVendedor = async (req, res) => {
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

deleteVendedor = async (req, res) => {
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

