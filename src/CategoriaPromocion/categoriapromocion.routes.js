import { Router } from 'express';
import { createCategoriaPromocion, getCategoriasPromocion, getCategoriaPromocionById, updateCategoriaPromocion, deleteCategoriaPromocion } from './categoriapromocion.controller.js';

const router = Router();

router.post('/categoria-promocion', createCategoriaPromocion);
router.get('/categoria-promocion', getCategoriasPromocion);
router.get('/categoria-promocion/:id', getCategoriaPromocionById);
router.put('/categoria-promocion/:id', updateCategoriaPromocion);
router.delete('/categoria-promocion/:id', deleteCategoriaPromocion);

export default router;
