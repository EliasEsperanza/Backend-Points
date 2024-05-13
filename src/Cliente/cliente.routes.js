import { Router } from "express";
import { createCliente, getClientes, getClienteById, updateCliente, deleteCliente, ObtenerVentas } from "./cliente.controller.js";

const router = Router();

router.get('/cliente', getClientes);
router.post('/cliente', createCliente);
router.get('/cliente/:id', getClienteById);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);
router.get('/clienteV/:id', ObtenerVentas);

export default router;