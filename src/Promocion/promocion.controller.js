import { Promocion } from './Promocion.js';

// Crear una nueva promoción
export const createPromocion = async (req, res) => {
    try {
        const nuevaPromocion = await Promocion.create(req.body);
        res.status(201).json(nuevaPromocion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las promociones
export const getPromociones = async (req, res) => {
    try {
        const promociones = await Promocion.findAll();
        res.json(promociones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una promoción por su ID
export const getPromocionById = async (req, res) => {
    const { id } = req.params;
    try {
        const promocion = await Promocion.findByPk(id);
        if (!promocion) {
            res.status(404).json({ message: 'Promoción no encontrada' });
            return;
        }
        res.json(promocion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una promoción
export const updatePromocion = async (req, res) => {
    const { id } = req.params;
    try {
        const [updateRowCount] = await Promocion.update(req.body, {
            where: {
                idPromocion: id
            }
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Promoción no encontrada' });
            return;
        }
        res.json({ message: 'Promoción actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una promoción
export const deletePromocion = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Promocion.destroy({
            where: {
                idPromocion: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Promoción no encontrada' });
            return;
        }
        res.json({
            message: 'Promoción eliminada exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
