import { Usuario } from "../Usuario/Usuario.js";
import { Premio } from "../Premio/Premio.js";
import { Canje } from "../Canjes/Canjes.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Cliente } from "../Cliente/Cliente.js";
import { Venta } from "../Ventas/Ventas.js";   

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const crearCanje = async (req, res) => {
    try {
        const { idPremio } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findOne({
            where: {
                idUsuario: decoded.idUsuario
            }
        });
        const cliente = await Cliente.findOne({
            where: {
                idCliente: usuario.idCliente
            }
        });
        const venta = await Venta.findOne({
            where: {
                idCliente: usuario.idCliente
            }
        });
        const premio = await Premio.findOne({
            where: {
                idPremio
            }
        });
        if (!premio) {
            return res.status(405).json({
                message: 'Premio no encontrado'
            });
        }
        if (usuario.puntos < premio.puntos) {
            return res.status(400).json({
                message: 'Puntos insuficientes'
            });
        }
        if (usuario.idNivel != premio.idNivel) {
            return res.status(400).json({
                message: 'Nivel incorrecto'
            });
        }

        let costo = premio.puntos/0.2;

        const canje = await Canje.create({
            idUsuario: usuario.idUsuario,
            idPremio,
            idCliente: usuario.idCliente,
            idSucursal: venta.idSucursal,
            puntosCanjeados: premio.puntos,
            fechaCanje: new Date(),
            nombreCliente: cliente.nombreCliente,
            costo
        });
        await usuario.update({
            puntos: usuario.puntos - premio.puntos
        });
        res.json({
            message: 'Canje realizado exitosamente',
            data: canje
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}