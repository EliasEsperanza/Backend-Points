import { Router } from 'express';
import { createCategoriaPromocion, getCategoriasPromocion, getCategoriaPromocionById, updateCategoriaPromocion, deleteCategoriaPromocion } from './categoriapromocion.controller.js';

const router = Router();

router.post('/categorias-promocion', createCategoriaPromocion);
router.get('/categorias-promocion', getCategoriasPromocion);
router.get('/categorias-promocion/:id', getCategoriaPromocionById);
router.put('/categorias-promocion/:id', updateCategoriaPromocion);
router.delete('/categorias-promocion/:id', deleteCategoriaPromocion);

export default router;
