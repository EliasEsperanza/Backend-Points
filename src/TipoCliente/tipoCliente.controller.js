import { TipoCliente } from "./TipoCliente.js";

export const createTipoCliente = async (req, res) => {
    try {
        const { descripcionTipo } = req.body;
        const newTipoCliente = await TipoCliente.create({
            descripcionTipo
        }, {
            fields: ['descripcionTipo']
        });
        if (newTipoCliente) {
            res.json({
                message: 'Tipo de cliente creado exitosamente',
                data: newTipoCliente
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getTiposCliente = async (req, res) => {
    try {
        const tiposCliente = await TipoCliente.findAll();
        res.json({
            data: tiposCliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const getTipoClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const tipoCliente = await TipoCliente.findOne({
            where: {
                idTipoCliente: id
            }
        });
        res.json({
            data: tipoCliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateTipoCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcionTipo } = req.body;
        const tipoCliente = await TipoCliente.findOne({
            where: {
                idTipoCliente: id
            }
        });
        if (tipoCliente) {
            await tipoCliente.update({
                descripcionTipo
            });
            res.json({
                message: 'Tipo de cliente actualizado',
                data: tipoCliente
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteTipoCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await TipoCliente.destroy({
            where: {
                idTipoCliente: id
            }
        });
        res.json({
            message: 'Tipo de cliente eliminado',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

