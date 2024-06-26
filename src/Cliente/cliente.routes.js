import { Router } from "express";
import { createCliente, getClientes, getClienteById, updateCliente, deleteCliente, ObtenerVentas, getClienteByDui } from "./cliente.controller.js";

const router = Router();

router.get('/clientes', getClientes);
router.post('/cliente', createCliente);
router.get('/cliente/:id', getClienteById);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);
router.get('/cliente/ventas/:id', ObtenerVentas);
router.get('/cliente/dui/:dui', getClienteByDui);

export default router;