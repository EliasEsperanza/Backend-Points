import { Router } from "express";
import { createCliente, getClientes, getClienteById, updateCliente, deleteCliente } from "./cliente.controller.js";

const router = Router();

router.get('/cliente', getClientes);
router.post('/cliente', createCliente);
router.get('/cliente/:id', getClienteById);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);

export default router;