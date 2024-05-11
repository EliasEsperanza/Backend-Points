import { Router } from 'express';
import { createPremio, getPremios, getPremioById, updatePremio, deletePremio } from './premio.controller.js';

const router = Router();

router.post('/premios', createPremio);
router.get('/premios', getPremios);
router.get('/premios/:id', getPremioById);
router.put('/premios/:id', updatePremio);
router.delete('/premios/:id', deletePremio);

export default router;
