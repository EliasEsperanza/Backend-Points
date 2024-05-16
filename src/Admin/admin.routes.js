import {getAdminById, getAllAdmins, createAdmin, deleteAdmin, updateAdmin} from './Admin.controller.js';
import { Router } from "express";
import { validateUser } from './UsuarioAdmin/UsuarioAdmin.controller.js';
import { createCliente, getClientes, getClienteById, updateCliente, deleteCliente } from "../Cliente/cliente.controller.js";
import { createCanje, getCanjes, getCanjeById, updateCanje, deleteCanje } from "./canjes.controller.js";
import { createCategoriaCliente, getCategoriasCliente, getCategoriaClienteById, updateCategoriaCliente, deleteCategoriaCliente } from "./categoriaCliente.controller.js";
import { createCategoriaPromocion, getCategoriasPromocion, getCategoriaPromocionById, updateCategoriaPromocion, deleteCategoriaPromocion } from './categoriapromocion.controller.js';
import { createNiveles , getNiveles, getNivelesById, updateNiveles, deleteNivel } from "./niveles.controller.js";
import { createPeriodo, getPeriodos, getPeriodoById, updatePeriodo, deletePeriodo } from './periodo.controller.js';
import { createPremio, getPremios, getPremioById, updatePremio, deletePremio } from './premio.controller.js';
import { createPromocion, getPromociones, getPromocionById, updatePromocion, deletePromocion } from './promocion.controller.js';
import { createSucursal, getSucursales, getSucursalById, updateSucursal, deleteSucursal } from './sucursal.controller.js';
import { createTipoCliente, getTiposCliente, getTipoClienteById, updateTipoCliente, deleteTipoCliente } from "./tipoCliente.controller.js";
import { getUsuarioById, getUsuarios } from "./usuario.controller.js";
import { createVendedor, getVendedores, getVendedorById, updateVendedor, deleteVendedor } from "./vendedor.controller.js";
import { crearPremio } from "./usuarioVendedor/UsuarioVendedor.controller.js";
import { createVenta, getVentas, getVentaById, updateVenta, deleteVenta } from './ventas.controller.js';

const router = Router();

router.get('/admins', getAllAdmins);
router.get('/admins/:id', getAdminById);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

router.post('/admin/clientes', validateUser, createCliente);
router.get('/admin/clientes', validateUser ,getClientes);
router.put('/admin/clientes', validateUser, updateCliente);
router.get('/admin/cliente/:id',validateUser,getClienteById);
router.delete('/admin/cliente/:id', validateUser, deleteCliente);

router.get('/admin/canjes',validateUser, getCanjes);
router.post('/admin/canjes',validateUser, createCanje);
router.get('/admin/canjes/:id',validateUser, getCanjeById);
router.put('/admin/canjes/:id', validateUser, updateCanje);
router.delete('/admin/canjes/:id',validateUser, deleteCanje);

router.get('/admin/categoriaCliente',validateUser, getCategoriasCliente);
router.post('/admin/categoriaCliente',validateUser, createCategoriaCliente);
router.get('/admin/categoriaCliente/:id',validateUser, getCategoriaClienteById);
router.put('/admin/categoriaCliente/:id',validateUser, updateCategoriaCliente);
router.delete('/admin/categoriaCliente/:id',validateUser, deleteCategoriaCliente);

router.post('/admin/categoria-promocion',validateUser, createCategoriaPromocion);
router.get('/admin/categoria-promocion',validateUser, getCategoriasPromocion);
router.get('/admin/categoria-promocion/:id',validateUser, getCategoriaPromocionById);
router.put('/admin/categoria-promocion/:id',validateUser, updateCategoriaPromocion);
router.delete('/admin/categoria-promocion/:id',validateUser,  deleteCategoriaPromocion);

router.get('/admin/niveles',validateUser, getNiveles);
router.post('/admin/niveles',validateUser, createNiveles);
router.get('/admin/niveles/:id',validateUser,getNivelesById);
router.put('/admin/niveles/:id',validateUser, updateNiveles);
router.delete('/admin/niveles/:id',validateUser, deleteNivel);

router.post('/admin/periodo', validateUser, createPeriodo);
router.get('/admin/periodo', validateUser, getPeriodos);
router.get('/admin/periodo/:id', validateUser, getPeriodoById);
router.put('/admin/periodo/:id', validateUser, updatePeriodo);
router.delete('/admin/periodo/:id', validateUser, deletePeriodo);

router.post('/admin/premio', validateUser, createPremio);
router.get('/admin/premio', validateUser, getPremios);
router.get('/admin/premio/:id', validateUser, getPremioById);
router.put('/admin/premio/:id', validateUser, updatePremio);
router.delete('/admin/premio/:id', validateUser, deletePremio);

router.post('/admin/promocion', validateUser, createPromocion);
router.get('/admin/promocion', validateUser, getPromociones);
router.get('/admin/promocion/:id', validateUser, getPromocionById);
router.put('/admin/promocion/:id', validateUser, updatePromocion);
router.delete('/admin/promocion/:id', validateUser, deletePromocion);


router.post('/admin/sucursal', validateUser, createSucursal);
router.get('/admin/sucursal', validateUser, getSucursales);
router.get('/admin/sucursal/:id', validateUser, getSucursalById);
router.put('/admin/sucursal/:id', validateUser, updateSucursal);
router.delete('/admin/sucursal/:id', validateUser, deleteSucursal);

router.get('/admin/tipoCliente', validateUser, getTiposCliente);
router.post('/admin/tipoCliente', validateUser, createTipoCliente);
router.get('/admin/tipoCliente/:id', validateUser, getTipoClienteById);
router.put('/admin/tipoCliente/:id', validateUser, updateTipoCliente);
router.delete('/admin/tipoCliente/:id', validateUser, deleteTipoCliente);

router.get('/admin/usuarios', validateUser, getUsuarios);
router.get('/admin/usuarios/:id', validateUser, getUsuarioById);

router.post('/admin/vendedor', validateUser, createVendedor);
router.get('/admin/vendedor', validateUser, getVendedores);
router.get('/admin/vendedor/:id', validateUser, getVendedorById);
router.put('/admin/vendedor/:id', validateUser, updateVendedor);
router.delete('/admin/vendedor/:id', validateUser, deleteVendedor);
router.post('/admin/vendedor/premio', validateUser, crearPremio);

router.post('/admin/ventas', validateUser, createVenta);
router.get('/admin/ventas', validateUser, getVentas);
router.get('/admin/ventas/:id', validateUser, getVentaById);
router.put('/admin/ventas/:id', validateUser, updateVenta);
router.delete('/admin/ventas/:id', validateUser, deleteVenta);

export default router;