import { Router } from "express";
import { createCategoriaCliente, getCategoriasCliente, getCategoriaClienteById, updateCategoriaCliente, deleteCategoriaCliente } from "./categoriaCliente.controller.js";

const router = Router();

router.get('/categoriaCliente', getCategoriasCliente);
router.post('/categoriaCliente', createCategoriaCliente);
router.get('/categoriaCliente/:id', getCategoriaClienteById);
router.put('/categoriaCliente/:id', updateCategoriaCliente);
router.delete('/categoriaCliente/:id', deleteCategoriaCliente);

export default router;