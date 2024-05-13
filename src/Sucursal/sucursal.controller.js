import { Sucursal } from './Sucursal.js';

// Crear una nueva sucursal
export const createSucursal = async (req, res) => {
    try {
        const nuevaSucursal = await Sucursal.create(req.body);
        res.status(201).json({
            message: 'Sucursal creada exitosamente',
            sucursal: nuevaSucursal
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las sucursales
export const getSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.findAll();
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una sucursal por su ID
export const getSucursalById = async (req, res) => {
    const { id } = req.params;
    try {
        const sucursal = await Sucursal.findByPk(id);
        if (!sucursal) {
            res.status(404).json({ message: 'Sucursal no encontrada' });
            return;
        }
        res.json(sucursal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una sucursal
export const updateSucursal = async (req, res) => {
    const { id } = req.params;
    try {
        const [updateRowCount, updatedSucursal] = await Sucursal.update(req.body, {
            where: {
                idSucursal: id
            },
            returning: true // Esto devuelve la sucursal actualizada
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Sucursal no encontrada' });
            return;
        }
        res.json({
            message: 'Sucursal actualizada exitosamente',
            sucursal: updatedSucursal[0] // Utiliza updatedSucursal[0] porque es un array
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una sucursal
export const deleteSucursal = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Sucursal.destroy({
            where: {
                idSucursal: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Sucursal no encontrada' });
            return;
        }
        res.json({
            message: 'Sucursal eliminada exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
