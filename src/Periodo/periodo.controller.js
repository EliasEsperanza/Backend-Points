import { Periodo } from './Periodo.js';

// Crear un nuevo periodo
export const createPeriodo = async (req, res) => {
    try {
        const nuevoPeriodo = await Periodo.create(req.body);
        res.status(201).json(nuevoPeriodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los periodos
export const getPeriodos = async (req, res) => {
    try {
        const periodos = await Periodo.findAll();
        res.json(periodos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un periodo por su ID
export const getPeriodoById = async (req, res) => {
    const { id } = req.params;
    try {
        const periodo = await Periodo.findByPk(id);
        if (!periodo) {
            res.status(404).json({ message: 'Periodo no encontrado' });
            return;
        }
        res.json(periodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un periodo
export const updatePeriodo = async (req, res) => {
    const { id } = req.params;
    try {
        const [updateRowCount] = await Periodo.update(req.body, {
            where: {
                idPeriodo: id
            }
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Periodo no encontrado' });
            return;
        }
        res.json({ message: 'Periodo actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un periodo
export const deletePeriodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Periodo.destroy({
            where: {
                idPeriodo: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Periodo no encontrado' });
            return;
        }
        res.json({
            message: 'Periodo eliminado exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
