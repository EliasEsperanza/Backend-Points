import { Cliente } from './Cliente.js';
import { Usuario } from '../Usuario/Usuario.js';
import argon2 from 'argon2';
import {Venta} from '../Ventas/Ventas.js';

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json({
            data: clientes
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const hashData = async (data) => {
    return await argon2.hash(data);
}

export const createCliente = async (req, res) => {
    try {
        const { nombreCliente, correo, telefono, direccion, dui, nit, nrc, idCategoriaCliente, idTipoCliente, passwordHash } = req.body;

        const newPasswordHash = await hashData(passwordHash);
        const newTelefonoHash = await hashData(telefono);
        const newDireccionHash = await hashData(direccion);
        const newDuiHash = await hashData(dui);
        const newNitHash = await hashData(nit);
        const newNrcHash = await hashData(nrc);


        // Crear el cliente
        const newCliente = await Cliente.create({
            nombreCliente,
            dui: newDuiHash,
            nit: newNitHash,
            nrc: newNrcHash,
            telefono: newTelefonoHash,
            direccion: newDireccionHash,
            correo,
            idCategoriaCliente,
            idTipoCliente
        });

        // Si el cliente se creó exitosamente, crear el usuario asociado
        if (newCliente) {
            // Crear el usuario con el mismo correo y contraseña que el cliente
            const usuario = await Usuario.create({
                correo,
                passwordHash: newPasswordHash,
                idCliente: newCliente.idCliente
            });

            // Si el usuario se creó exitosamente, responder con éxito
            if (usuario) {
                res.json({
                    message: 'Cliente y usuario creados exitosamente',
                    data: { cliente: newCliente, usuario }
                });
            } else {
                // Si no se pudo crear el usuario, responder con un error
                res.status(500).json({
                    message: 'Error al crear el usuario asociado al cliente'
                });
            }
        } else {
            // Si no se pudo crear el cliente, responder con un error
            res.status(500).json({
                message: 'Error al crear el cliente'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findOne({
            where: {
                idCliente: id
            }
        });
        res.json({
            data: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCliente, correo, telefono, direccion, dui, nit, nrc, idCategoriaCliente, idTipoCliente } = req.body;
        const cliente = await Cliente.findOne({
            where: {
                idCliente: id
            }
        });
        await cliente.update({
            nombreCliente,
            dui,
            nit,
            nrc,
            telefono,
            direccion,
            correo,
            idCategoriaCliente,
            idTipoCliente
        });
        res.json({
            message: 'Cliente actualizado exitosamente',
            data: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await Cliente.destroy({
            where: {
                idCliente: id
            }
        });
        res.json({
            message: 'Cliente eliminado exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const ObtenerVentas = async (req, res) =>{
    try {
        const { id } = req.params;
        // Verifica si id está presente
        if (!id) {
            return res.status(400).json({ message: 'Falta el parámetro de ID en la solicitud' });
        }

        const ventas = await Venta.findAll({
            where: {
                idCliente: id
            }
        });
        let sumas = 0;
        ventas.forEach(element => {
            if (element.puntosGanados !== undefined) {
                sumas += element.puntosGanados || 0;
            }
            
        });
        const Usur = await Usuario.findOne({
            where:{
                idCliente: id
            }
        });

        if (Usur) {
            await Usur.update({
                puntosGanados: sumas
            });
        } else {
            // Manejo de error si no se encuentra el usuario
            res.json({
                message: 'no se encontro usuario para agregar puntos para canjear',
            });
        }

        res.json({
            message: 'puntos para canjear',
            count: sumas
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}