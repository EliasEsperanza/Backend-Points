import { Venta } from './Ventas.js';

// Crear una nueva venta
export const createVenta = async (req, res) => {
    try {
        const nuevaVenta = await Venta.create(req.body);
        res.status(201).json({
            message: 'Venta creada exitosamente',
            venta: nuevaVenta
        });
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
export const updateVenta = async (req, res) => {
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
        res.json({
            message: 'Venta actualizada exitosamente',
            venta: updatedVenta[0] // Utiliza updatedVenta[0] porque es un array
        });
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
