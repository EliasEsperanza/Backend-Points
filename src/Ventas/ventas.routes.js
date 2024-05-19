import { Router } from 'express';
import { createVenta, getVentas, getVentaById, updateVenta, deleteVenta, GetVentas2 } from './ventas.controller.js';

const router = Router();

router.post('/ventas', createVenta, GetVentas2);
router.get('/ventas', getVentas);
router.get('/ventas/:id', getVentaById);
router.put('/ventas/:id', updateVenta, GetVentas2);
router.delete('/ventas/:id', deleteVenta);

export default router;
