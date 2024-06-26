import { Niveles } from './Niveles.js';
import multer from 'multer';

export const getNiveles = async(req, res) =>{
    try {
        const niveles = await Niveles.findAll();
        res.json({
            data: niveles
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
}

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

export const createNiveles = async (req, res)=>{
    try {
        const { descripcion, puntosInicio, puntosFin} = req.body;
        const icono = req.file ? req.file.filename : '';
        const newNivel = await Niveles.create({
            descripcion,
            puntosInicio,
            puntosFin,
            icono
        }, {
            fields: ['descripcion','puntosInicio', 'puntosFin', 'icono']
        });
        if (newNivel) {
            res.json({
                message:'Nivel creado exitosamente',
                data: newNivel
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
// Middleware para subir archivos
export const uploadIcono = upload.single('icono');

export const getNivelesById = async (req,res) =>{
    try {
        const {id} = req.params;
        const nivel = await Niveles.findOne({
            where:{
                idNivel: id
            }
        });
        res.json({
            data: nivel
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const updateNiveles = async(req,res) =>{
    try{
        const {id} = req.params;
        const{ descripcion, puntosInicio, puntosFin, icono} = req.body;
        const nivel = await Niveles.findOne({
            where:{
                idNivel: id
            }
        });
        await nivel.update({
            descripcion,
            puntosInicio,
            puntosFin,
            icono
        });
        res.json({
            message: 'Nivel actualizado exitosamente',
            data: nivel
        });
    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

export const deleteNivel = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteRowCount = await Niveles.destroy({
            where: {
                idNivel: id
            }
        });
        if (deleteRowCount === 0) {
            res.status(404).json({ message: 'Nivel no encontrado' });
            return;
        }
        res.json({
            message: 'Nivel eliminado exitosamente',
            count: deleteRowCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
