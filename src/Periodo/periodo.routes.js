import { Router } from 'express';
import { createPeriodo, getPeriodos, getPeriodoById, updatePeriodo, deletePeriodo } from './periodo.controller.js';

const router = Router();

router.post('/periodo', createPeriodo);
router.get('/periodo', getPeriodos);
router.get('/periodo/:id', getPeriodoById);
router.put('/periodo/:id', updatePeriodo);
router.delete('/periodo/:id', deletePeriodo);

export default router;
