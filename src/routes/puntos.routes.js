import {Router} from 'express';
import {crearCanje} from '../controller/puntos.js';

const router = Router();
router.post('/canje/usuario', crearCanje);

export default router;