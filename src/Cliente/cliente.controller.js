import {Cliente} from './Cliente.js';
import {Usuario} from '../Usuario/Usuario.js';


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
        const { nombreCliente, correo, telefono, direccion,dui,nit,nrc, idCategoriaCliente, idTipoCliente, password } = req.body;
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
        }, {
            fields: ['nombreCliente', 'dui', 'nit', 'nrc', 'telefono', 'direccion', 'correo', 'password','idCategoriaCliente', 'idTipoCliente', 'password']
        });

        const usuario = await Usuario.create({
            correo,
            password
        });

        if (newCliente) {
            res.json({
                message: 'Cliente creado exitosamente',
                data: newCliente, usuario
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

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
        const { nombreCliente, correo, telefono, direccion,dui,nit,nrc, idCategoriaCliente, idTipoCliente } = req.body;
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

