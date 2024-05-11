import { Cliente } from './Cliente.js';
import { Usuario } from '../Usuario/Usuario.js';


export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json({
            data: clientes
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createCliente = async (req, res) => {
    try {
        const { nombreCliente, correo, telefono, direccion, dui, nit, nrc, idCategoriaCliente, idTipoCliente, password } = req.body;

        // Crear el cliente
        const newCliente = await Cliente.create({
            nombreCliente,
            dui,
            nit,
            nrc,
            telefono,
            direccion,
            correo,
            password,
            idCategoriaCliente,
            idTipoCliente
        });

        // Si el cliente se creó exitosamente, crear el usuario asociado
        if (newCliente) {
            // Crear el usuario con el mismo correo y contraseña que el cliente
            const usuario = await Usuario.create({
                correo,
                password
            });

            // Si el usuario se creó exitosamente, responder con éxito
            if (usuario) {
                res.json({
                    message: 'Cliente y usuario creados exitosamente',
                    data: { cliente: newCliente, usuario }
                });
            } else {
                // Si no se pudo crear el usuario, responder con un error
                res.status(500).json({
                    message: 'Error al crear el usuario asociado al cliente'
                });
            }
        } else {
            // Si no se pudo crear el cliente, responder con un error
            res.status(500).json({
                message: 'Error al crear el cliente'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findOne({
            where: {
                idCliente: id
            }
        });
        res.json({
            data: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCliente, correo, telefono, direccion, dui, nit, nrc, idCategoriaCliente, idTipoCliente } = req.body;
        const cliente = await Cliente.findOne({
            where: {
                idCliente: id
            }
        });
        await cliente.update({
            nombreCliente,
            dui,
            nit,
            nrc,
            telefono,
            direccion,
            correo,
            idCategoriaCliente,
            idTipoCliente
        });
        res.json({
            message: 'Cliente actualizado exitosamente',
            data: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await Cliente.destroy({
            where: {
                idCliente: id
            }
        });
        res.json({
            message: 'Cliente eliminado exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

