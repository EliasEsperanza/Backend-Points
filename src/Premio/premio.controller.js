import { Premio } from './Premio.js';
import { Niveles } from '../Niveles/Niveles.js';
import multer from 'multer';
import path from 'path';

// Configuración de multer para almacenar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Crear un nuevo premio
export const createPremio = async (req, res) => {
    try {
        const { idNivel, nombrePremio, puntos, estado, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : '';

        const nuevoPremio = await Premio.create({
            idNivel,
            nombrePremio,
            puntos,
            estado,
            imagen,
            descripcion
        });

        res.status(201).json(nuevoPremio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Middleware para subir archivos
export const uploadImage = upload.single('imagen');
// Obtener todos los premios
export const getPremios = async (req, res) => {
    try {
        const premio = await Premio.findAll();
        res.json(premio);
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

export const getPremioByNivel = async (req, res) => {
    const {id} = req.params;
    try {
        const premios = await Premio.findAll()
        const premiosNivel = premios.filter(premio => premio.idNivel == id);
        if (!premiosNivel) {
            res.status(404).json({ message: 'Premio no encontrado' });
            return;
        }
        res.json(premiosNivel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
