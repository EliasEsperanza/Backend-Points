import { Router } from 'express';
import { createPromocion, getPromociones, getPromocionById, updatePromocion, deletePromocion } from './promocion.controller.js';

const router = Router();

router.post('/promocion', createPromocion);
router.get('/promocion', getPromociones);
router.get('/promocion/:id', getPromocionById);
router.put('/promocion/:id', updatePromocion);
router.delete('/promocion/:id', deletePromocion);

export default router;
