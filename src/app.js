import express from 'express';
import clienteRoutes from './Cliente/cliente.routes.js';
import categoriaClienteRoutes from './CategoriaCliente/categoriaCliente.routes.js';
import tipoClienteRoutes from './TipoCliente/tipoCliente.routes.js';

const app = express();

app.use(express.json());
app.use(clienteRoutes);
app.use(categoriaClienteRoutes);
app.use(tipoClienteRoutes);

export default app;