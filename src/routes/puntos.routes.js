import { Router } from 'express';
import { crearCanje } from '../controller/puntos.js';

const router = Router();
router.post('/usuario/canje/premio', crearCanje);

export default router;