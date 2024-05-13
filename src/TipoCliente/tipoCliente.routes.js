import { Router } from "express";
import { createTipoCliente, getTiposCliente, getTipoClienteById, updateTipoCliente, deleteTipoCliente } from "./tipoCliente.controller.js";

const router = Router();

router.get('/tipoCliente', getTiposCliente);
router.post('/tipoCliente', createTipoCliente);
router.get('/tipoCliente/:id', getTipoClienteById);
router.put('/tipoCliente/:id', updateTipoCliente);
router.delete('/tipoCliente/:id', deleteTipoCliente);

export default router;