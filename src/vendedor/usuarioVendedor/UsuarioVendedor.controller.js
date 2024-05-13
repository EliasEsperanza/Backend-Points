import { Vendedor } from "../Vendedor.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Premio } from "../../Premio/Premio.js";

dotenv.config();

//Quiero que el pueda crear premios si este tiene el token activo

export const crearPremio = async (req, res) => {
    try {
        const { nombrePremio, puntos, estado, imagen, descripcion, idNivel } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const idVendedor = decoded.idVendedor;
        const vendedor = await Vendedor.findOne({
            where: {
                idVendedor
            }
        });
        if (!vendedor) {
            return res.status(404).json({
                message: 'Vendedor no encontrado'
            });
        }
        const premio = await Premio.create({
            nombrePremio,
            puntos,
            estado,
            imagen,
            descripcion,
            idNivel
        });
        res.json({
            message: 'Premio creado exitosamente',
            data: premio
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}