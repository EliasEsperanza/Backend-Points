import { Admin } from './Admin.js';

// Función para validar los datos de entrada del administrador
const validateAdminData = (data) => {
    const { nombreAdmin, password, idCliente } = data;
    const errors = [];

    if (!nombreAdmin || typeof nombreAdmin !== 'string') {
        errors.push('El nombre del administrador es inválido o está ausente.');
    }

    if (!password || typeof password !== 'string') {
        errors.push('La contraseña es inválida o está ausente.');
    }

    if (!idCliente || typeof idCliente !== 'number') {
        errors.push('El ID del cliente es inválido o está ausente.');
    }

    return errors;
};

// Controlador para crear un nuevo administrador
export const createAdmin = async (req, res) => {
    const adminData = req.body;

    // Validar los datos de entrada
    const validationErrors = validateAdminData(adminData);
    if (validationErrors.length > 0) {
        return res.status(400).json({ message: 'Error de validación', errors: validationErrors });
    }

    try {
        // Crear el administrador
        const newAdmin = await Admin.create(adminData);
        return res.status(201).json(newAdmin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los administradores
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        return res.json(admins);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener un administrador por su ID
export const getAdminById = async (req, res) => {
    const adminId = req.params.id;

    try {
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            return res.json(admin);
        } else {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar los datos de un administrador
export const updateAdmin = async (req, res) => {
    const adminId = req.params.id;
    const updatedData = req.body;

    // Validar los datos de entrada
    const validationErrors = validateAdminData(updatedData);
    if (validationErrors.length > 0) {
        return res.status(400).json({ message: 'Error de validación', errors: validationErrors });
    }

    try {
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            await admin.update(updatedData);
            return res.json(admin);
        } else {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un administrador por su ID
export const deleteAdmin = async (req, res) => {
    const adminId = req.params.id;

    try {
        const admin = await Admin.findByPk(adminId);
        if (admin) {
            await admin.destroy();
            return res.json({ message: 'Administrador eliminado exitosamente' });
        } else {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
