import { Cliente } from './Cliente.js';
import { Usuario } from '../Usuario/Usuario.js';
import {Venta} from '../Ventas/Ventas.js';
import { sequelize } from "../database/database.js";
import { Niveles } from '../Niveles/Niveles.js';
import { Periodo } from '../Periodo/Periodo.js';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
        
const hashData = async (data,secretKey) => {
    return CryptoJS.AES.encrypt(data, secretKey || process.env.SECRET_KEY).toString();
}

const decryptData = async (hash, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(hash, secretKey || process.env.SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const createCliente = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        

        const { nombreCliente, correo, telefono, direccion, dui, nit, nrc, idCategoriaCliente, idTipoCliente, passwordHash } = req.body;

        const newPasswordHash = await hashData(passwordHash, process.env.SECRET_KEY);
        const newTelefonoHash = await hashData(telefono, process.env.SECRET_KEY);
        const newDireccionHash = await hashData(direccion, process.env.SECRET_KEY);
        const newDuiHash = await hashData(dui, process.env.SECRET_KEY);
        const newNitHash = await hashData(nit, process.env.SECRET_KEY);
        const newNrcHash = await hashData(nrc, process.env.SECRET_KEY);


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
        },{ transaction: t });

        // Si el cliente se creó exitosamente, crear el usuario asociado
        if (newCliente) {
            // Crear el usuario con el mismo correo y contraseña que el cliente
            const usuario = await Usuario.create({
                correo,
                passwordHash: newPasswordHash,
                idCliente: newCliente.idCliente
            },{ transaction: t });


            await t.commit();
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
        await t.rollback();
        res.status(500).json({
            message: error.message
        });
    }
}

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        const decryptedClientes = await Promise.all(clientes.map(async cliente => {
            return {
                ...cliente.dataValues,
                dui: await decryptData(cliente.dui, process.env.SECRET_KEY),
                nit: await decryptData(cliente.nit, process.env.SECRET_KEY),
                nrc: await decryptData(cliente.nrc, process.env.SECRET_KEY),
                telefono: await decryptData(cliente.telefono, process.env.SECRET_KEY),
                direccion: await decryptData(cliente.direccion, process.env.SECRET_KEY)
            };
        }));
        res.json({ data: decryptedClientes });
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

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        // Desencriptar los datos necesarios
        const decryptedCliente = {
            ...cliente.dataValues,
            dui: await decryptData(cliente.dui, process.env.SECRET_KEY),
            nit: await decryptData(cliente.nit, process.env.SECRET_KEY),
            nrc: await decryptData(cliente.nrc, process.env.SECRET_KEY),
            telefono: await decryptData(cliente.telefono, process.env.SECRET_KEY),
            direccion: await decryptData(cliente.direccion, process.env.SECRET_KEY),
        };

        res.json({ data: decryptedCliente });
    } catch (error) {
        console.error("Error al obtener cliente por ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCliente, correo, telefono, direccion, dui, nit, nrc, idCategoriaCliente, idTipoCliente } = req.body;
        const newTelefonoHash = await hashData(telefono, process.env.SECRET_KEY);
        const newDireccionHash = await hashData(direccion, process.env.SECRET_KEY);
        const newDuiHash = await hashData(dui, process.env.SECRET_KEY);
        const newNitHash = await hashData(nit, process.env.SECRET_KEY);
        const newNrcHash = await hashData(nrc, process.env.SECRET_KEY);
        const cliente = await Cliente.findOne({
            where: {
                idCliente: id
            }
        });
        await cliente.update({
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
        const t = await sequelize.transaction();
        try {
            // Eliminar el usuario asociado al cliente
            await Usuario.destroy({
                where: {
                    idCliente: id
                },
                transaction: t
            });
            // Eliminar el cliente
            const deleteRowCount = await Cliente.destroy({
                where: {
                    idCliente: id
                },
                transaction: t
            });
            await t.commit();
            res.json({
                message: 'Cliente eliminado exitosamente',
                count: deleteRowCount
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
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
        let idPeriodos =[];
        
        // Obtener los idPeriodo únicos de las ventas
        if(ventas && ventas.length >0){
            idPeriodos = [...new Set(ventas.map(venta => venta.idPeriodo))];
        }

        // Obtener todos los períodos activos que están siendo referenciados por las ventas
        const periodos = await Periodo.findAll({
            where: {
                estado: 1,
                idPeriodo: idPeriodos
            }
        });

        function toDateOnly(date) {
            const d = new Date(date);
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }

        // Sumar los puntos ganados en las ventas dentro de los períodos activos
        let sumas = 0;
        for(const venta of ventas){
            periodos.forEach(periodo => {
                const fechaVenta = toDateOnly(venta.fechaVenta);
                const fechaInicio = toDateOnly(periodo.fechaInicio);
                const fechaFin = toDateOnly(periodo.fechaFin);
                
                if (venta.puntosGanados !== undefined && 
                    fechaVenta >= fechaInicio && 
                    fechaVenta <= fechaFin) {
                    sumas += venta.puntosGanados || 0;
                }
            });
        }
    
        const Usur = await Usuario.findOne({
            where:{
                idCliente: id
            }
        });

        const niveles = await Niveles.findAll();
        let nuevoNivel = null;
        // Obtener los niveles y verificar el nivel del usuario basado en los puntos
        
        let nivelMaximo = null;

        niveles.forEach(nivel => {
            if (sumas >= nivel.puntosInicio && sumas <= nivel.puntosFin) {
                nuevoNivel = nivel.idNivel;
            }
            if (nivelMaximo === null || nivel.puntosFin > nivelMaximo.puntosFin) {
                nivelMaximo = nivel;
            }
        });

        // Si no se encuentra un nivel adecuado, asignar el nivel máximo
        if (nuevoNivel === null && sumas > nivelMaximo.puntosFin) {
            nuevoNivel = nivelMaximo.idNivel;
        }

        if (!Usur) {

            // Manejo de error si no se encuentra el usuario
            res.json({
                message: 'no se encontro usuario para agregar puntos para canjear y actualizar nivel',
            });

            
        } else {
            await Usur.update({
                puntos: sumas
            });
            if (nuevoNivel !== null) {
                await Usur.update({
                    idNivel: nuevoNivel
                });
            }
            res.json({
                message: 'puntos para canjear y su nivel actualiz',
                count: sumas, nuevoNivel
            });
        }

        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}