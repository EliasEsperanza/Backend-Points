import {getAdminById, getAllAdmins, createAdmin, deleteAdmin, updateAdmin} from './Admin.controller.js';
import { Router } from "express";

const router = Router();

router.get('/admins', getAllAdmins);
router.get('/admins/:id', getAdminById);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;