import { Venta } from './Ventas.js';
import { Periodo } from '../Periodo/Periodo.js';
import { Usuario } from '../Usuario/Usuario.js';
import { Niveles } from '../Niveles/Niveles.js';
// Crear una nueva venta
export const createVenta = async (req, res,next) => {
    try {
        const nuevaVenta = await Venta.create(req.body);
        /*res.status(201).json({
            message: 'Venta creada exitosamente',
            venta: nuevaVenta
        }); */
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las ventas
export const getVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una venta por su ID
export const getVentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await Venta.findByPk(id);
        if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
            return;
        }
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una venta
export const updateVenta = async (req, res,next) => {
    const { id } = req.params;
    try {
        const [updateRowCount, updatedVenta] = await Venta.update(req.body, {
            where: {
                idVenta: id
            },
            returning: true // Esto devuelve la venta actualizada
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Venta no encontrada' });
            return;
        }
        next();/*
        res.json({
            message: 'Venta actualizada exitosamente',
            venta: updatedVenta[0] // Utiliza updatedVenta[0] porque es un array
        });*/
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una venta
export const deleteVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Venta.destroy({
            where: {
                idVenta: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Venta no encontrada' });
            return;
        }
        res.json({
            message: 'Venta eliminada exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const GetVentas2 = async(req,res)=>{
    try {

        const usuarios = await Usuario.findAll();
        const niveles = await Niveles.findAll();
        const ventas = await Venta.findAll();
        const periodos = await Periodo.findAll({
            where: {
                estado: 1
            }
        });
        

        function toDateOnly(date) {
            const d = new Date(date);
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        }

        for (const Usur of usuarios){
            let sumas = 0;
            // Filtrar ventas del usuario actual
            const ventasUsuario = ventas.filter(venta => venta.idCliente === Usur.idCliente);


            for (const venta of ventasUsuario) {
                for (const periodo of periodos) {
                    const fechaVenta = toDateOnly(venta.fechaVenta);
                    const fechaInicio = toDateOnly(periodo.fechaInicio);
                    const fechaFin = toDateOnly(periodo.fechaFin);

                    if (venta.puntosGanados !== undefined && 
                        fechaVenta >= fechaInicio && 
                        fechaVenta <= fechaFin) {
                        sumas += venta.puntosGanados || 0;
                    }
                }
            }

            
            // Determinar el nivel del usuario basado en los puntos
            let nuevoNivel = null;
            let nivelMaximo = null;

            for (const nivel of niveles) {
                if (sumas >= nivel.puntosInicio && sumas <= nivel.puntosFin) {
                    nuevoNivel = nivel.idNivel;
                }
                if (nivelMaximo === null || nivel.puntosFin > nivelMaximo.puntosFin) {
                    nivelMaximo = nivel;
                }
            }

            // Si no se encuentra un nivel adecuado, asignar el nivel máximo
            if (nuevoNivel === null && sumas > nivelMaximo.puntosFin) {
                nuevoNivel = nivelMaximo.idNivel;
            }

            if (Usur) {
                await Usur.update({
                    puntos: sumas
                });
                if (nuevoNivel !== null) {
                    await Usur.update({
                        idNivel: nuevoNivel
                    });
                }
            } else {
                // Manejo de error si no se encuentra el usuario
                res.json({
                    message: 'no se encontro usuario para agregar puntos para canjear y actualizar nivel',
                });
            }
        }

        const Nusuarios = await Usuario.findAll();

        res.json({
            message: 'puntos para canjear y su nivel actualiz',
            Nusuarios
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    
};

