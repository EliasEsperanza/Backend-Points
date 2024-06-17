import { Router } from 'express';
import { crearCanje, crearCanjebyIdSinToken } from '../controller/puntos.js';

const router = Router();
router.post('/usuario/canje/premio', crearCanje);
router.post('admin/canje/premio', crearCanjebyIdSinToken);

export default router;