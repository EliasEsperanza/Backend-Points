import { Router } from "express";
import { createNiveles , getNiveles, getNivelesById, updateNiveles, deleteNivel } from "./niveles.controller.js";

const router = Router();

router.get('/niveles', getNiveles);
router.post('/niveles', createNiveles);
router.get('/niveles/:id',getNivelesById);
router.put('/niveles/:id', updateNiveles);
router.delete('/niveles/:id', deleteNivel);

export default router;