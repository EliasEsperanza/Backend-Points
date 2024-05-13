import { Router } from "express";
import { createCanje, getCanjes, getCanjeById, updateCanje, deleteCanje } from "./canjes.controller.js";

const router = Router();

router.get('/canjes', getCanjes);
router.post('/canjes', createCanje);
router.get('/canjes/:id', getCanjeById);
router.put('/canjes/:id', updateCanje);
router.delete('/canjes/:id', deleteCanje);

export default router;
