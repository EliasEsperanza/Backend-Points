import { Router } from 'express';
import { createPremio, getPremios, getPremioById, updatePremio, deletePremio, getPremioByNivel, uploadImage} from './premio.controller.js';

const router = Router();

router.post('/premio', uploadImage,createPremio);
router.get('/premio', getPremios);
router.get('/premio/:id', getPremioById);
router.put('/premio/:id', updatePremio);
router.delete('/premio/:id', deletePremio);
router.get('/premio/nivel/:id', getPremioByNivel);

export default router;
