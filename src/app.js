import express from 'express';
import cors from 'cors';
import clienteRoutes from './Cliente/cliente.routes.js';
import categoriaClienteRoutes from './CategoriaCliente/categoriaCliente.routes.js';
import tipoClienteRoutes from './TipoCliente/tipoCliente.routes.js';
import  nivelesRoutes  from "./Niveles/niveles.routes.js";
import usuarioRoutes from './Usuario/usuario.routes.js';
import canjeRoutes from "./Canjes/canjes.routes.js";
import categoriapromocionRouter from './CategoriaPromocion/categoriapromocion.routes.js';
import periodoRouter from './Periodo/periodo.routes.js';
import premioRouter from './Premio/premio.routes.js';
import sucursalRouter from './Sucursal/sucursal.routes.js';
import ventaRouter from './Ventas/ventas.routes.js';
import loginRouter from './auth/login.routes.js';
import promocionRouter from './Promocion/promocion.routes.js';

import vendedorRouter from './vendedor/vendedor.routes.js';

import admindRouter from './Admin/admin.routes.js';
import puntosRouter from './routes/puntos.routes.js';

import emailRouter from './email/email.js';

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(clienteRoutes);
app.use(puntosRouter);
app.use(categoriaClienteRoutes);
app.use(tipoClienteRoutes);
app.use(nivelesRoutes);
app.use(usuarioRoutes);
app.use(canjeRoutes);
app.use(categoriapromocionRouter);
app.use(periodoRouter);
app.use(premioRouter);
app.use(sucursalRouter);
app.use(ventaRouter);
app.use(loginRouter);
app.use(promocionRouter);
app.use(vendedorRouter);
app.use(admindRouter);
app.use(emailRouter);

export default app;