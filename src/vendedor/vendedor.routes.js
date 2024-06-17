import { Router } from "express";
import { createVendedor, getVendedores, getVendedorById, updateVendedor, deleteVendedor } from "./vendedor.controller.js";
import { crearPremio, updateUserVendedor, getAllUserVendedor, getUserVendedorById } from "./usuarioVendedor/UsuarioVendedor.controller.js";

const router = Router();

router.post("/vendedor", createVendedor);
router.get("/vendedor", getVendedores);
router.get("/vendedor/:id", getVendedorById);
router.put("/vendedor/:id", updateVendedor);
router.delete("/vendedor/:id", deleteVendedor);

router.post("/vendedor/premio", crearPremio);
router.get("/vendedorUser", getAllUserVendedor);
router.get("/vendedorUser/:id", getUserVendedorById);
router.post("/vendedorUser/:id", updateUserVendedor);

export default router;
