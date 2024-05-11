import { CategoriaPromocion } from './CategoriaPromocion.js';

// Crear una nueva categoría de promoción
export const createCategoriaPromocion = async (req, res) => {
    try {
        const nuevaCategoria = await CategoriaPromocion.create(req.body);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las categorías de promoción
export const getCategoriasPromocion = async (req, res) => {
    try {
        const categorias = await CategoriaPromocion.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una categoría de promoción por su ID
export const getCategoriaPromocionById = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await CategoriaPromocion.findByPk(id);
        if (!categoria) {
            res.status(404).json({ message: 'Categoría de promoción no encontrada' });
            return;
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una categoría de promoción
export const updateCategoriaPromocion = async (req, res) => {
    const { id } = req.params;
    try {
        const [updateRowCount] = await CategoriaPromocion.update(req.body, {
            where: {
                idCategoriaPromocion: id
            }
        });
        if (updateRowCount === 0) {
            res.status(404).json({ message: 'Categoría de promoción no encontrada' });
            return;
        }
        res.json({ message: 'Categoría de promoción actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una categoría de promoción
export const deleteCategoriaPromocion = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await CategoriaPromocion.destroy({
            where: {
                idCategoriaPromocion: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Categoría de promoción no encontrada' });
            return;
        }
        res.json({
            message: 'Categoría de promoción eliminada exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
