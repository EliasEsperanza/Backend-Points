import { Canje } from './Canje.js';


// Crear un nuevo canje
export const createCanje = async (req, res) => {
    try {
        const nuevoCanje = await Canje.create(req.body);
        res.status(201).json(nuevoCanje);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los canjes
export const getCanjes = async (req, res) => {
    try {
        const canjes = await Canje.findAll({
            include: [Cliente, Premio, Sucursal]
        });
        res.json(canjes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un canje por su ID
export const getCanjeById = async (req, res) => {
    const { id } = req.params;
    try {
        const canje = await Canje.findByPk(id, {
            include: [Cliente, Premio, Sucursal]
        });
        if (!canje) {
            res.status(404).json({ message: 'Canje no encontrado' });
            return;
        }
        res.json(canje);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un canje
export const updateCanje = async (req, res) => {
    const { id } = req.params;
    try {
        const [updateRowCount] = await Canje.update(req.body, {
            where: {
                idCanje: id
            }
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Canje no encontrado' });
            return;
        }
        res.json({ message: 'Canje actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un canje
export const deleteCanje = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Canje.destroy({
            where: {
                idCanje: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Canje no encontrado' });
            return;
        }
        res.json({
            message: 'Canje eliminado exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
