import { Router } from 'express';
import { createSucursal, getSucursales, getSucursalById, updateSucursal, deleteSucursal } from './sucursal.controller.js';

const router = Router();

router.post('/sucursal', createSucursal);
router.get('/sucursal', getSucursales);
router.get('/sucursal/:id', getSucursalById);
router.put('/sucursal/:id', updateSucursal);
router.delete('/sucursal/:id', deleteSucursal);

export default router;
