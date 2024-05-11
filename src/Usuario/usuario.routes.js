import { Router } from "express";
import { getUsuarioById, getUsuarios } from "./usuario.controller.js";

const router = Router();
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);

export default router;