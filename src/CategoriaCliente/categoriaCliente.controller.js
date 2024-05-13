import { CategoriaCliente } from "./CategoriaCliente.js";

export const createCategoriaCliente = async (req, res) => {
    try {
        const { nombreCategoria } = req.body;
        const newCategoriaCliente = await CategoriaCliente.create({
            nombreCategoria
        }, {
            fields: ['nombreCategoria']
        });
        if (newCategoriaCliente) {
            res.json({
                message: 'Categoria de cliente creada exitosamente',
                data: newCategoriaCliente
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getCategoriasCliente = async (req, res) => {
    try {
        const categoriasCliente = await CategoriaCliente.findAll();
        res.json({
            data: categoriasCliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getCategoriaClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaCliente = await CategoriaCliente.findOne({
            where: {
                idCategoriaCliente: id
            }
        });
        res.json({
            data: categoriaCliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateCategoriaCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCategoria } = req.body;
        const categoriaCliente = await CategoriaCliente.findOne({
            where: {
                idCategoriaCliente: id
            }
        });
        if (categoriaCliente) {
            await categoriaCliente.update({
                nombreCategoria
            });
            res.json({
                message: 'Categoria de cliente actualizada',
                data: categoriaCliente
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteCategoriaCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategoriaCliente = await CategoriaCliente.destroy({
            where: {
                idCategoriaCliente: id
            }
        });
        res.json({
            message: 'Categoria de cliente eliminada',
            count: deletedCategoriaCliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}