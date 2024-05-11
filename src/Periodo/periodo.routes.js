import { Router } from 'express';
import { createPeriodo, getPeriodos, getPeriodoById, updatePeriodo, deletePeriodo } from './periodo.controller.js';

const router = Router();

router.post('/periodos', createPeriodo);
router.get('/periodos', getPeriodos);
router.get('/periodos/:id', getPeriodoById);
router.put('/periodos/:id', updatePeriodo);
router.delete('/periodos/:id', deletePeriodo);

export default router;
