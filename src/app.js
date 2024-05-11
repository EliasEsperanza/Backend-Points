import express from 'express';
import clienteRoutes from './Cliente/cliente.routes.js';
import categoriaClienteRoutes from './CategoriaCliente/categoriaCliente.routes.js';
import tipoClienteRoutes from './TipoCliente/tipoCliente.routes.js';
import  nivelesRoutes  from "./Niveles/niveles.routes.js";
import canjeRoutes from "./Canje/canje.routes.js";
import usuarioRoutes from './Usuario/usuario.routes.js';

const app = express();

app.use(express.json());
app.use(clienteRoutes);
app.use(categoriaClienteRoutes);
app.use(tipoClienteRoutes);
app.use(nivelesRoutes);
app.use(canjeRoutes)
app.use(usuarioRoutes);

export default app;