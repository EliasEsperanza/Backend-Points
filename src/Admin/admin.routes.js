import {Router} from 'express';
import { createAdmin, getAllAdmins, getAdminById, deleteAdmin, updateAdmin} from './Admin.controller.js';
import { getAllUserAdmin, getUserAdminById, updateUserAdmin } from './UsuarioAdmin/UsuarioAdmin.controller.js';

const router = Router();

// Rutas para los administradores
router.post('/admin', createAdmin);
router.get('/admin', getAllAdmins);
router.get('/admin/:id', getAdminById);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);
router.get('/adminUser', getAllUserAdmin);
router.get('/adminUser/:id', getUserAdminById);
router.post('/adminUser/:id', updateUserAdmin);

export default router;