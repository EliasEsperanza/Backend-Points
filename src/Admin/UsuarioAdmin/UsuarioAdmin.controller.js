import { UsuarioAdmin } from "./UsuarioAdmin.js"

export const getAllUserAdmin = async (req,res) =>{
    try {
        const usuarioadmin = await UsuarioAdmin.findAll();
        res.json(usuarioadmin);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
export const getUserAdminById = async (req,res)=>{
    const {id} = req.params;
    try {
        const usuarioadmin = await UsuarioAdmin.findOne({
            where:{
                idUsuarioAdmin: id
            }
        });
        res.json({
            message: 'Usuario Admin obtenido',
            data: usuarioadmin
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
export const updateUserAdmin = async (req,res)=>{
    const {id} = req.params;
    try {
        const usuarioadmin = await UsuarioAdmin.findOne({
            where:{
                idUsuarioAdmin: id
            }
        });
        const {usuario, password, rol, idAdmin} = req.body;
        await usuarioadmin.update({
            usuario,
            password,
            rol,
            idAdmin
        });
        res.json({
            message:'Usuario Admin actualizado exitoso',
            data: usuarioadmin
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};