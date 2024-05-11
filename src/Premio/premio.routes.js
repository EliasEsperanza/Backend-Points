import { Router } from 'express';
import { createPremio, getPremios, getPremioById, updatePremio, deletePremio } from './premio.controller.js';

const router = Router();

router.post('/premio', createPremio);
router.get('/premio', getPremios);
router.get('/premio/:id', getPremioById);
router.put('/premio/:id', updatePremio);
router.delete('/premio/:id', deletePremio);

export default router;
