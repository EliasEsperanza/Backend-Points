import { Router } from 'express';
import { createVenta, getVentas, getVentaById, updateVenta, deleteVenta } from './ventas.controller.js';

const router = Router();

router.post('/ventas', createVenta);
router.get('/ventas', getVentas);
router.get('/ventas/:id', getVentaById);
router.put('/ventas/:id', updateVenta);
router.delete('/ventas/:id', deleteVenta);

export default router;
