import { Premio } from './Premio.js';

// Crear un nuevo premio
export const createPremio = async (req, res) => {
    try {
        const nuevoPremio = await Premio.create(req.body);
        res.status(201).json(nuevoPremio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los premios
export const getPremios = async (req, res) => {
    try {
        const premios = await Premio.findAll();
        res.json(premios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un premio por su ID
export const getPremioById = async (req, res) => {
    const { id } = req.params;
    try {
        const premio = await Premio.findByPk(id);
        if (!premio) {
            res.status(404).json({ message: 'Premio no encontrado' });
            return;
        }
        res.json(premio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un premio
export const updatePremio = async (req, res) => {
    const { id } = req.params;
    try {
        const [updateRowCount] = await Premio.update(req.body, {
            where: {
                idPremio: id
            }
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Premio no encontrado' });
            return;
        }
        res.json({ message: 'Premio actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un premio
export const deletePremio = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Premio.destroy({
            where: {
                idPremio: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Premio no encontrado' });
            return;
        }
        res.json({
            message: 'Premio eliminado exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
